/**
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
FileSchema.statics.createAndMove = async function(multifile, user){
    if(!user)
        return {status: 'fail', doc: null, message: 'createAndMove did not get userId'}

    // local storage
    const path = await localFile.moveFile(multifile)
    if(!path)
        return {status: 'fail', doc: null, message: 'Can not move file'};

    // mongo
    try{
        const created = await new this({
            path: path,
            owner: user,
            mimetype: multifile.mimetype,
        }).save();
        return {status: 'success', doc: created, message: null};
    }
    catch(err){
        const errors = Object.keys(err.errors).map(key => err.errors[key].message);
        return {status: 'fail', doc: null, message: errors};
    }
}

/**
 * delete by Id
 * returns deleted doc
 * */
FileSchema.statics.deleteAndRemoveById = async function(id){
    const file = await this.findById(id);
    if(!file)
        return ({status: 'fail', doc: null, message: `Not found file with id ${id}`});

    return await file.deleteAndRemove();
}

/**
 * Почему не воспользоваться сразу встроенным методом delete?
 * Метод нужен для удаления файла не только из mongo, а еще из локального хранилаща бинарного файла
 * if we already found doc, we can call just delete
 * returns itself
 * */
FileSchema.methods.deleteAndRemove = async function(){
    // local storage
    const isRemoved = await localFile.removeFile(this.path)
    if(!isRemoved)
        return {status: 'fail', doc: null, message: `Can not remove file on path ${this.path}`};

    // mongo
    try{
        await this.delete();
        return {status: 'success', doc: this, message: null};
    }
    catch(err){
        return {status: 'fail', doc: null, message: `Can not remove file from mongo ${this.id}}`};
    }
}

// Только сохранения и удаления будет достаточно пока
// FileSchema.methods.update = async function(file){}

module.exports = mongoose.model('File', FileSchema);
