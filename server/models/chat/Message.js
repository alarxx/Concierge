const {Schema, model} = require("mongoose");

const ServiceSchema = require('../services/ServiceSchema');

const ChoiceSchema = new Schema({
    services: [{
        type: ServiceSchema,
    }],
    selectedServices: [{
        type: Schema.Types.ObjectId,
        default: []
    }],
    isSubmitted: {
        type: Boolean,
        default: false,
    },
    multiple_choice: {
        type: Boolean,
        default: false,
        immutable: true,
    },
});


const MessageSchema = new Schema(
    {
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
            enum: ['service?', 'text', 'file', 'image', 'choice', 'notice', 'payment'],
            immutable: true,
            required: true,
        },
        message_id: {
            type: String,
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
        file_name: {
            type: String,
        },
        image: {
            type: Schema.Types.ObjectId,
            ref: 'File'
        },
        choice: {
            type: ChoiceSchema,
        },
        notice: {
            type: String,
        },
        payment: {
          type: String, // здесь должна быть форма
        },

        description: {
            type: String,
        },
    },
    {
        timestamps: true,
        strict: true,
    }
);


MessageSchema.index({ createdAt: 1 }); // сначала старые, сверху вниз, внизу новейшие сообщения


MessageSchema.plugin(require('mongoose-unique-validator'));
MessageSchema.plugin(require('../log-plugin'));
MessageSchema.plugin(require('../../websocket/observer/chat/message-observer'));


module.exports = model('Message', MessageSchema);