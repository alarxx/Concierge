const {Schema, model} = require("mongoose");

const modelName = 'Message';

const log = require('../../logging/log');

const colors = require("../../logging/colors");

const MessageSchema = new Schema({
    conversation: {
        type: Schema.Types.ObjectId,
        ref: 'Conversation',
        immutable: true,
        required: true,
    },
    sender: { // Здесь мы можем указывать user, а не participant,
        type: Schema.Types.ObjectId,
        ref: 'User',
        immutable: true,
        required: true,
    },
    type: {
        type: String,
        enum: ['service', 'text', 'file', 'form'],
        immutable: true,
        required: true,
    },
    // action: {type: String, enum: ['invite_members', 'join_group_by_link']},
    text: {
        type: String,
    },
    file: {
        type: Schema.Types.ObjectId,
        ref: 'File'
    },
    description: {
      type: String,
    },
    form: {
        type: Object,
    },
    timeSent: {
        type: Date,
        default: new Date(),
    },
    /*readBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],*/
});



MessageSchema.plugin(require('mongoose-unique-validator'));
MessageSchema.plugin(require('../logPlugin'))
MessageSchema.plugin(require('../../websocket/observer/chat/message'))


MessageSchema.methods.onCreate = async function({req, res, body, user}){
    if(body.type ? !body[body.type] : true){
        throw new Error(`Fields 'type' or with 'String(type)' are not provided`);
    }
    const Notifications = require('../modelsManager').models.Notification;

    const notification = new Notifications({
        type: 'message',
        message: this.id,
        user: user.id
    });

    await notification.save()

    this.sender = user.id;

}


MessageSchema.statics.deepDeleteById = async function(id){
    const message = await this.findById(id);
    if(!message)
        return `Not found message with id ${id}`;
    return await message.deepDelete();
}


MessageSchema.methods.deepDelete = async function(){
    // Нужно удалить notification, если он есть
    const Notifications = require('../modelsManager').models.Notification;
    const notification = await Notifications.findOne({message: this.id});
    console.log(notification);
    if(notification){
        await notification.deepDelete();
    }

    // Если message.type = form или файл, то мы не только саму модель удаляем
    await this.delete();
    return this;
}


module.exports = model(modelName, MessageSchema);