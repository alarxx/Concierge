const ApiError = require("../../../exceptions/ApiError");
const ModelService = require("../../helpers/ModelService");
const AdminService = require('../../helpers/AdminService');

const { Conversation, Participant, Message, Notification } = require('../../../models/models-manager');
const conversationDto = require('../../../dtos/chat/conversation-dto');

const logger = require('../../../log/logger')('conversation-service');

const adminService = AdminService(Conversation, conversationDto, { creatorField: 'creator' });

const modelService = new ModelService(Conversation);

async function deepDelete(conversationId){
    const conversationModel = await Conversation.findById(conversationId);
    if(!conversationModel){
        throw ApiError.NotFound(`conversation${conversationId} not found`);
    }
    const messageModels = await Message.find({ conversation: conversationId });
    const participantModels = await Participant.find({ conversation: conversationId });
    const notificationModels = await Notification.find({ conversation: conversationId });

    await Conversation.findOneAndDelete({_id: conversationId});

    await Promise.all(messageModels.map(async messageModel => {
        await Message.findOneAndDelete({_id: messageModel._id});
    }));

    await Promise.all(participantModels.map(async participantModel => {
        await Participant.findOneAndDelete({_id: participantModel._id});
    }));

    await Promise.all(notificationModels.map(async notificationModel => {
        await Notification.findOneAndDelete({_id: notificationModel._id});
    }));
}

module.exports = ({
    ...adminService,
    deepDelete
});