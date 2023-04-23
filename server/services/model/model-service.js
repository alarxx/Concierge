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
        // Вот этот момент нужно пересмотреть.
        // Здесь мы не меняем случайно req.files? Нельзя изменять аргументы, но другая реализация будет сильно сложнее.
        // На application/json типе может быть files будет не определен.
        if(!files){
            files = {};
        }

        logger.log("saveWithFiles arguments:", { model, files, fileFields, privateFiles });

        if(!model || !fileFields || !privateFiles){
            throw ApiError.ServerError('Some required fields are missing')
        }

        // Если файлов нет, то мы просто пытаемся сохранить модель
        if(Object.keys(files).length === 0){
            return await model.save(); // .catch(err => { throw ApiError.MongooseError(err) });
        }

        /*
        * Обязательно перед сохранением файлов, нужно свалидировать модель, нет ли там ошибки.
        * Иначе в файл сохранится, а модель нет и файл затеряется в файловой системе.
        * Обязательно нужна проверка unique полей
        * */
        await model.validate();

        const new_files = await setFiles(model, files, fileFields, privateFiles, {
            owner: opts.user?.id,
            accessHolders: opts.accessHolders ? opts.accessHolders : []
        });

        logger.log({ new_files })

        await model.save(); // .catch(err => { throw ApiError.MongooseError(err) });

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
 *
 * */
async function setFiles(model, files={}, fileFields=[], privateFiles=[], opts = {
    owner: undefined,
    accessHolders: []
}) {
    // Здесь стоит загружать файлы синхронно, чтобы не другие файлы не завершались в неопределенное состояние.
    return await Promise.all(fileFields.map(async key => {
        // Если в форме есть файл под таким ключом
        if(files[key]) {
            // delete if file already exist
            if(mongoose.isValidObjectId(model[key])){
                await fileService.deleteFile(model[key]);
            }

            const file = await fileService.createFile(files[key], {
                owner: opts.owner,
                accessType: privateFiles.includes(key) ? 'private' : 'public',
                accessHolders: opts.owner ? [...opts.accessHolders, opts.owner] : opts.accessHolders,
            });

            model[key] = file.id;

            return file;
        }
    }));
}

module.exports = new ModelService();