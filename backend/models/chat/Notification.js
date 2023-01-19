const {Schema, model} = require('mongoose');

const User = require('../User');
const Message = require('./Message');

const NotificationSchema = new Schema({
    message: {
        type: Schema.Types.ObjectId,
        ref: 'Message',
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

NotificationSchema.plugin(require('mongoose-unique-validator'));
NotificationSchema.plugin(require('../logPlugin'))

NotificationSchema.methods.firstFilling = async function({body, user}){
    this.user = user.id;
    return this;
}

NotificationSchema.statics.deepDeleteById = async function(id){
    const notification = await this.findById(id);
    if(!notification)
        return `Not found notification with id ${id}`;
    return await notification.deepDelete();
}

NotificationSchema.methods.deepDelete = async function(){
    await this.delete();
    return this;
}

module.exports = model('Notification', NotificationSchema);