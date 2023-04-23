const {Schema, model} = require("mongoose");


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
        enum: ['service?', 'text', 'file', 'choice'],
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
    choice: {
        services: [{
            type: Schema.Types.ObjectId,
            ref: 'Service',
            immutable: true,
        }],
        selectedServices: [{
            type: Schema.Types.ObjectId,
            default: []
        }],
        submitted: {
            type: Boolean,
            default: false,
        },
        multiple_choice: {
            type: Boolean,
            default: false,
            immutable: true,
        },
    },
    createdDate: {
        type: Date,
        immutable: true,
        default: () => new Date(),
    },
    updatedDate: {
        type: Date,
        default: () => new Date(),
    }
});

MessageSchema.plugin(require('mongoose-unique-validator'));
MessageSchema.plugin(require('../log-plugin'))
// MessageSchema.plugin(require('../../websocket/observer/chat/message'))


/*MessageSchema.methods.onCreate = async function({req, res, body, user}){
    if(body.type ? !body[body.type] : true){
        throw new Error(`Fields 'type' or with 'String(type)' are not provided`);
    }

    const Notifications = require('../modelsManager').models.Notification;
    const Participants = require('../modelsManager').models.Participant;

    const ps = await Participants.find({conversation: body.conversation});

    await Promise.all(ps.map(async p => {
        return await new Notifications({
            type: 'message',
            message: this.id,
            user: p.user,
        }).save();
    }))

    this.sender = user.id;
}*/


/*MessageSchema.statics.deepDeleteById = async function(id){
    const message = await this.findById(id);
    if(!message)
        return `Not found message with id ${id}`;
    return await message.deepDelete();
}*/


/*MessageSchema.methods.deepDelete = async function(){
    // Нужно удалить notifications, если они есть
    const Notifications = require('../modelsManager').models.Notification;
    const notifications = await Notifications.find({message: this.id});
    if(notifications.length){
        await Promise.all(notifications.map(
            async n => await n.deepDelete()
        ));
    }

    // Если message.type = choice или файл, то мы не только саму модель удаляем
    await this.delete();
    return this;
}*/


module.exports = model('Message', MessageSchema);