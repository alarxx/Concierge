const {Schema, model} = require('mongoose');

const handlers = require("../handlers");

const ConversationSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: ()=>`Service ${Date.now()}`
    },
    type: {
        type: String,
        enum: ['private_group', 'public_group'],
        required: true,
        default: 'private_group'
    },
    startTime: {
        type: Date,
        immutable: true,
        default: new Date(),
    },
    // endTime: {},
    isArchived: {
        type: Boolean,
        default: false
    },
});


ConversationSchema.plugin(require('mongoose-unique-validator'));
ConversationSchema.plugin(require('../logPlugin'))
ConversationSchema.plugin(require('../../websocket/observer/chat/conversation'))


ConversationSchema.methods.onCreate = async function({body, user}){
    const Participant = require('./Participant');
    const participant = new Participant({conversation: this, user: user.id});
    await participant.save();
}


ConversationSchema.methods.deepDelete = async function(){
    await this.delete();

    // Delete all messages that belong to conversation
    const Message = require('./Message');
    const Participant = require('./Participant');

    const messages = await Message.find({conversation: this.id});
    await Promise.all(messages.map(
        async message => await message.deepDelete()
    ));

    //Delete all participant that belong to conversation
    const participants = await Participant.find({conversation: this.id});
    await Promise.all(participants.map(
        async participant => await participant.deepDelete()
    ));

    return this;
}


module.exports = model('Conversation', ConversationSchema);