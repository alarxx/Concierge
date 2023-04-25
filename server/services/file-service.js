/**
 * Метод сохраняет файл локально и сохраняет в базе mongo.
 * function arguments: express-fileupload file and owner user id
 * returns {status, created_doc, message}
 * */

const fs = require('fs');
const mongoose = require('mongoose');
const { File } = require('../models/models-manager');
const ApiError = require('../exceptions/ApiError');
const logger = require('../log/logger')('file-service')


/**
 * Функция возвращает модель файла, если все проверки прошли успешно.
 *
 * (Авторизация) Если файл приватный и пользователь аутентифицирован,
 * мы проверяем его роль и идентификатор, чтобы убедиться, что он имеет права на доступ к файлу.
 * */
async function getFile(id, user){
    if(!mongoose.isValidObjectId(id)){
        throw ApiError.BadRequest("Invalid request parameter")
    }
    const file = await File.findById(id);
    logger.log("file:", file);
    if(!file) {
        // return res.status(404).json({error: 'File not found'});
        throw ApiError.NotFound('File not found')
    }

    // Проверить существует ли файл на file.path
    await fs.promises.access(file.path)
        .catch(err => {
            logger.log(err);
            throw ApiError.BadRequest("Could not access the binary file, no such file or directory");
        });

    if(file.accessType === 'private'){
        if(!user){
            // res.status(401).json({message: 'Unauthorized'});
            throw ApiError.UnauthorizedError();
        }

        if(user.role === 'client' && file.owner != user.id){
            if(!file.accessHolders.includes(user.id)){
                // return res.status(403).json({ error: 'Permission denied' });
                throw ApiError.Forbidden('Permission denied')
            }
        }
    }

    return file;
}

/**
 * Создает модель файла на основе бинарного файла multifile, наша сущность файла из fileupload.
 * */
async function createFile(multifile, opts={
    owner: undefined,
    accessType: 'public',
    accessHolders: []
}){
    if(!multifile) {
        throw ApiError.ServerError('createFile did not get multifile')
    }

    // local disk storage
    const path = await multifile.save();
    if(!path){
        throw ApiError.ServerError('Can not move file');
    }

    const file = new File({
        path: path,
        name: multifile.originalname,
        encoding: multifile.encoding,
        mimetype: multifile.mimetype,

        ...opts
        // Default values in mongoose
        // owner: undefined
        // accessHolders: [],
        // accessType: 'public',
    })

    await file.save();

    return file;
}

/**
 * delete by Id
 * returns deleted doc
 * */
async function deleteFile(id){
    // id всегда должно быть валидным ObjectId
    const file = await File.findByIdAndDelete(id); // equals to findOneAndDelete

    if(!file){
        // ничего страшного, если не найден
        // throw new Error(`Not found file with id ${id}`);
        return;
    }

    // Нужно найти используется ли где-нибудь этот файл еще
    const same = await File.find({ path: file.path });
    // И если не используется удаляем файл
    if(same.length === 0){
        // local storage
        await fs.promises.unlink(file.path);
    }

    return file;

}


module.exports = ({
    getFile,
    createFile,
    deleteFile
});