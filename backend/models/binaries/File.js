/**
 * Пользоваться только static методами createFile и deepDelete.
 * из api мы можем его только прочитать, мы не можем напрямую создать его или изменить?
 *
 * File отличается от других моделей, его нельзя создать или изменить напрямую через api.
 * Все взаимодействия с File должны происходить из других моделей.
 *
 * Двоичный файл можно создать, удалить и прочитать.
 * Как можно изменить двоичный файл? Удалить документ из mongo и создать заново.
 * Что мы можем изменить в документе?
 * *    людей имеющих доступ
 * *    приватность файла
 * */
const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const User = require('../User'); // ref на User
const localFile = require('./localFile');

const FileSchema = new Schema({
    path: {
        type: String,
        immutable: true,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        immutable: true,
        required: true
    },
    mimetype: {
        type: String,
        immutable: true,
        required: true
    },

    accessHolders: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    private: { type: Boolean, default: true },
});


FileSchema.plugin(require('mongoose-unique-validator'));


/**
 * Метод сохраняет файл локально и сохраняет в базе mongo
 * function arguments: express-fileupload file and owner user id
 * returns {status, created_doc, message}
 * */
FileSchema.statics.createFile = async function(multifile, user){
    if(!multifile)
        throw new Error('createFile did not get multifile')
    if(!user)
        throw new Error('createFile did not get user');

    // local storage
    const path = await localFile.moveFile(multifile)
    if(!path)
        throw new Error('Can not move file');

    // mongo
    const file = new this({
        path: path,
        owner: user.id,
        mimetype: multifile.mimetype,
    });

    // Никогда не выдаст ошибку
    await file.save();

    return file;
}

/**
 * delete by Id
 * returns deleted doc
 * */
FileSchema.statics.deepDeleteById = async function(id){
    const file = await this.findById(id);
    if(!file){
        // throw new Error(`Not found file with id ${id}`);
        return `Not found file with id ${id}`; // ничего страшного, если не найден
    }

    return await file.deepDelete();
}

/**
 * PRIVATE
 * Почему не воспользоваться сразу встроенным методом delete?
 * Метод нужен для удаления файла не только из mongo, а еще из локального хранилаща бинарного файла
 * if we already found doc, we can call just delete
 * returns itself
 * */
FileSchema.methods.deepDelete = async function(){
    // local storage
    await localFile.removeFile(this.path);

    // mongo
    await this.delete();

    return this;
}

// Только сохранения и удаления будет достаточно пока
// FileSchema.methods.update = async function(file){}

module.exports = mongoose.model('File', FileSchema);
