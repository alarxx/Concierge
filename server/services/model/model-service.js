const mongoose = require("mongoose");

const ApiError = require("../../exceptions/ApiError");
const fileService = require("../../services/file-service");
const {File} = require("../../models/models-manager");
const logger = require('../../log/logger')('model-service');

class ModelService {

    /**
     * Возвращает отфильтрованный массив ключей, которые содержатся в объекте.
     * Можно узнать наличие определенных ключей в объекте.
     *  */
    #hasKeys(obj, keys){
        console.log('hasKeys',{obj, keys})
        return keys.filter(key => {
            return key in obj;
        });
    }

    getFileFields(Model){
        return Object.values(Model.schema.paths)
            .filter(field =>{
                    return Model.schema.paths[field.path].instance === 'ObjectId' &&
                        Model.schema.paths[field.path].options.ref === 'File';
                }
            )
            .map(field => {
                return field.path;
            });
    }

    getPrivateFiles(Model){
        return Model.privateFiles ? Model.privateFiles() : [];
    }

    getUniqueFields(Model) {
        const uniqueFields = Object.values(Model.schema.paths)
            .filter(field => field.options.unique)
            .map(field => field.path);
        uniqueFields.unshift('id');
        return uniqueFields;
    }

    /**
     * Возвращает ключ по которому можно искать документ в базе данных
     * */
    get_pkey(body, uniqueFields){
        const contains = uniqueFields.filter(key => {
            return key in body;
        })
        if (contains.length === 0) {
            throw ApiError.BadRequest(`${'\''.concat(uniqueFields.join('\' or \'')).concat('\'')} field not provided`);
        }
        else if(contains.length > 1){
            throw ApiError.BadRequest(`More than one primary key (of ${'\''.concat(uniqueFields.join('\', \'')).concat('\'')}) provided in req.body`)
        }
        // const pkey = contains[0] === 'id' ? '_id' : contains[0];
        return contains[0];
    }

    /**
     * Удаление файлов.
     * Если в body fileField type != ObjectId -> то мы удаляем этот файл
     * */
    async deleteInvalidFileFields(body, model, fileFields){
        if(!body || !model || !fileFields){
            throw ApiError.ServerError('Some required fields are missing')
        }
        await Promise.all(
            fileFields.map(async key => {
                // Если в форме есть файл под таким ключом
                // Если боди.кей обджектАйди то, мы можем засетить, в таком случае пропускаем.
                // Если боди.кей не обджект айди, то мы удаляем.
                if(!mongoose.isValidObjectId(body[key])){ /*body[key] != undefined*/
                    // delete if file already exist
                    if(model[key]){
                        await fileService.deleteFile(model[key]);
                        model[key] = undefined; // null будет сохраняться в бд как null
                    }
                    delete body[key];
                }
            })
        );
    }


    /**
     * Функция позволяет сохранять модель и связанные с ней файлы в базе данных.
     * Сохранить модель и связанные файлы в базе данных.
     *
     * Если файлов в модели нет, то можно просто делать `model.save();`
     * */
    async saveWithFiles(model, files, fileFields, privateFiles, opts={ user: undefined, accessHolders: [] }){
        if(!files){
            files = {};
        }

        logger.log({ model, files, fileFields, privateFiles });

        if(!model || !fileFields || !privateFiles){
            throw ApiError.ServerError('Some required fields are missing')
        }

        // Если файлов нет, то мы просто пытаемся сохранить модель
        if(Object.keys(files).length === 0){
            return await model.save()
                .catch(err => { throw ApiError.MongooseError(err) });
        }

        /*
        * Обязательно перед сохранением файлов, нужно свалидировать модель, нет ли там ошибки.
        * Иначе в файл сохранится, а модель нет и файл затеряется в файловой системе.
        *
        * По-хорошему мы должны объявить документ file, назначить модельке, попробовать сохранить модель и только потом сохранять файл.
        *
        * Обязательно нужна проверка unique полей,
        * validate не проверяет unique поля, они проверяются только на save();
        * */
        const new_files = await setFiles(model, files, fileFields, privateFiles, { owner: opts.user?.id, accessHolders: opts.accessHolders });

        await model.save()
            .catch(err => { throw ApiError.MongooseError(err) });


        // Дальше мы должны назначить точный путь файлам и сохранить их все.
        const errors = [];

        await Promise.all(new_files.map(async ({ file, multifile }) => {
            // Что будет если здесь выйдет ошибка? У нас модель будет с битым файлом или id файла, которого не будет существовать в худшем случае или path=broken будет.
            const path = await multifile.save()
                .catch(err => errors.push(err));

            file.path = path ? path : 'broken';

            await file.save()
                .catch(err => { throw ApiError.MongooseError(err) });
        }));

        if(errors.length > 0){
            throw ApiError.ServerError("Something wrong with files", errors);
        }

        return model;
    }


    /**
     * Удалить всех файлов закрепленных к модели
     * */
    async deleteAttachedFiles(model, fileFields){
        if(!model || !fileFields){
            throw ApiError.ServerError('Some required fields are missing')
        }
        await Promise.all(
            fileFields.map(async key => {
                // delete if file already exist
                if(mongoose.isValidObjectId(model[key])){ // можно было бы сделать простую проверку, if(model[key])
                    await fileService.deleteFile(model[key]);
                }
            })
        );
    }

}


/**
 * Возвращает массив псевдо документов файлов.
 * Создает модельки файлов, но не сохраняет их ни в базе, ни на диске.
 * */
async function setFiles(model, files={}, fileFields=[], privateFiles=[], opts = { owner: undefined, accessHolders: []}) {
    if(!opts.accessHolders){
        opts.accessHolders = [];
    }

    return await Promise.all(
        fileFields.map(async key => {
            // Если в форме есть файл под таким ключом
            if(files[key]) {
                // delete if file already exist
                if(mongoose.isValidObjectId(model[key])){
                    await fileService.deleteFile(model[key]);
                }

                // const newFile = await this.createFile(files[key], opts);
                const multifile = files[key];
                if(!multifile){
                    throw ApiError.ServerError('createFile did not get multifile');
                }

                const file = new File({
                    name: multifile.originalname,
                    encoding: multifile.encoding,
                    mimetype: multifile.mimetype,
                    accessType: privateFiles.includes(key) ? 'private' : 'public',
                    accessHolders: opts.owner ? [...opts.accessHolders, opts.owner] : opts.accessHolders,
                    ...opts
                })

                model[key] = file.id;

                return { file, multifile };
            }
        })
    );
}

module.exports = new ModelService();