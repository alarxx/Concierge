const {Schema, model} = require('mongoose');


const ConversationSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            default: ()=>`Conversation ${Date.now()}`
        },
        type: {
            type: String,
            enum: ['direct', 'private_group', 'public_group'],
            required: true,
            default: 'private_group'
        },
        // endTime: {},
        isArchived: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true,
        strict: true,
    }
);


ConversationSchema.plugin(require('mongoose-unique-validator'));
ConversationSchema.plugin(require('../log-plugin'));
ConversationSchema.plugin(require('../../websocket/observer/chat/conversation-observer'));


/* Срабатывает только на REST API */
/*ConversationSchema.methods.onCreate = async function({body, user}){
    const Participant = require('./Participant');
    const participant = new Participant({conversation: this, user: user.id});
    await participant.save();
}*/


/*ConversationSchema.methods.deepDelete = async function(){
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
}*/


module.exports = model('Conversation', ConversationSchema);