const {Schema, model} = require('mongoose');

require('./User'); // ref на User
const FileModel = require('./binaries/File');

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        immutable: true,
        required: true,
    },
    files: [{type: Schema.Types.ObjectId, ref: 'File'}],
    accessHolders: [{type: Schema.Types.ObjectId, ref: 'User'}],
    createdDate: {
        type: Date,
        immutable: true,
        default: () => new Date()
    },
    updatedDate: {
        type: Date,
        default: () => new Date()
    }
});

PostSchema.pre('save', (next)=>{
    this.updatedDate = new Date();
    next();
});

/**
 * Метод будет использоваться во время update
 * Метод нужен потому что не получается использовать распространение объекта
 * returns document itself
 * */
PostSchema.methods.setFields = async function(data){
    // line by line all fields if they exist
    if(data.title)
        this.title = data.title;
    if(data.body)
        this.body = data.body;

    return this;
}

/**
 * Метод создает, сохраняет локально файл и добавляет его id в файлы пост
 * */
PostSchema.methods.addFile = async function(multifile, userId){
    // Метод полностью опирается на FileModel.createAndMove
    const res = await FileModel.createAndMove(multifile, userId);

    if(!this.files)
        this.files = [];

    if(res.status === 'success')
        this.files.push(res.doc.id);

    return res;
}

/**
 * We should delete binaries that belong to post
 * returns deleted document
 * */
PostSchema.methods.deleteAllFiles = async function(){
    try{
        await Promise.all(
            this.files.map(async id => await this.removeFileById(id))
        )

        return ({status: 'success'})
    }
    catch (e){
        return ({status: 'fail', message: e.message})
    }
}

PostSchema.methods.removeFileById = async function(id){
    // Проверяем есть ли файл в массиве файлов поста
    if(!this.files || !this.files.includes(id))
        return {status: 'fail', message: `Not found file of post with id ${id}`}

    // Удаляем файл из mongo и из локального хранилища
    const {status, doc, message} = await FileModel.deleteAndRemoveById(id);
    if(status === 'fail')
        return {status, message}

    // Удаляем объект из массива файлов поста
    const index = this.files.indexOf(id)
    this.files.splice(index, 1);

    return {status, doc};
}

PostSchema.methods.giveAccess = async function(user){}

PostSchema.plugin(require('mongoose-unique-validator'));

const Post = model('Post', PostSchema);

module.exports = Post;
