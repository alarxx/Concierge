const {Schema, model} = require('mongoose');

const Message = require('./Message');
const Participant = require('./Participant');
const handlers = require("../handlers");

const ConversationSchema = new Schema({
    name: {
        type: String,
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


ConversationSchema.methods.onCreate = async function({body, user}){
    return this;
}


ConversationSchema.methods.deepDelete = async function(){
    // Delete all messages that belong to conversation
    const messages = await Message.find({conversation: this.id});
    await Promise.all(messages.map(
        async message => await message.deepDelete()
    ));

    //Delete all participant that belong to conversation
    const participants = await Participant.find({conversation: this.id});
    await Promise.all(participants.map(
        async participant => await participant.deepDelete()
    ));

    await this.delete();
    return this;
}


module.exports = model('Conversation', ConversationSchema);