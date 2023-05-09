const ApiError = require("../../exceptions/ApiError");
const ModelService = require("../helpers/ModelService");

const logger = require('../../log/logger')('chat-service');

const { Conversation, Message, Notification, Participant } = require('../../models/models-manager');
const conversation_dto = require('../../dtos/chat/conversation-dto');
const message_dto = require('../../dtos/chat/message-dto');
const notification_dto = require('../../dtos/chat/notification-dto');
const participant_dto = require('../../dtos/chat/participant-dto');

const conversation_modelService = new ModelService(Conversation);
const message_modelService = new ModelService(Message);
const notification_modelService = new ModelService(Notification);
const participant_modelService = new ModelService(Participant);

async function firstLoad(user){
    if(!user){
        throw ApiError.BadRequest('user is not provided');
    }

    // Загрузить все participant-ы и conversation-ы
    // Загрузить все нотификации и по одному сообщению с каждого conversation-a

    const userParticipation = await Participant.find({ user: user.id });
    const userConversationIds = userParticipation.map(p => p.conversation);

    const conversations = await Conversation.find({ _id: { $in: userConversationIds } });

    const participants = await Participant.find({ conversation: { $in: userConversationIds } });

    const messages = await Promise.all(conversations.map(async conversation => {
        return await Message.find({ conversation: conversation.id })
            .sort({ 'createdAt': -1 }) // .allowDiskUse(true)
            .limit(1);
    }));

    const notifications = await Notification.find({ user: user.id });

    return ({
        conversations: conversations.map(c => conversation_dto(c, user)),
        participants: participants.map(c => participant_dto(c, user)),
        notifications: notifications.map(c => notification_dto(c, user)),
        messages: messages.map(c => message_dto(c, user)),
    });
}

async function startConversation(user, users=[], name=`Conversation ${Date.now()}`, type='private_group'){
    if(!user){
        throw ApiError.BadRequest('user is not provided');
    }
    if(!users || users.length === 0){
        throw ApiError.BadRequest('users are not provided. Cannot create conversation without participants');
    }

    const conversation = new Conversation({
        name,
        type
    });

    const participants = users.map(_user => new Participant({
        conversation: conversation.id,
        user: _user.id,
        role: 'participant'
    }));

    participants.push(new Participant({
        conversation: conversation.id,
        user: user.id,
        role: 'admin'
    }))

    await conversation.save();
    await Promise.all(participants.map(async p => await p.save()));

    // Наверное стоит еще скидывать какое-нибудь init сообщение и добавлять уведомление, типа беседа создана.

    return ({
        conversation: conversation_dto(conversation, user),
        participants: participants.map(p => participant_dto(p, user))
    });
}

module.exports = ({
    firstLoad,
});