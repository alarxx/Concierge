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

    // Загрузить все participant-ы пользователя и его conversation-ы
    // Загрузить все нотификации? и по одному сообщению с каждого conversation-a
    // Возможно здесь лучше возвращать не нотификации, а их количество.

    const userParticipation = await Participant.find({ user: user.id });

    const userConversationIds = userParticipation.map(p => p.conversation);

    const conversations = await Conversation.find({ _id: { $in: userConversationIds } });

    // Здесь тоже нужна пагинация 1000 бесед по 1000 участников = 1mln
    // const participants = await Participant.find({ conversation: { $in: userConversationIds } });

    const __messages = (await Promise.all(conversations.map(async conversation => {
        return await Message.find({ conversation: conversation.id })
            .sort({ 'createdAt': -1 }) // .allowDiskUse(true)
            .limit(5);
    })));

    const messages = __messages.flatMap(arr=>arr);

    const notifications = await Notification.find({ user: user.id });

    return ({
        conversations: conversations.map(c => conversation_dto(c, user)),
        participants: userParticipation.map(c => participant_dto(c, user)),
        notifications: notifications.map(c => notification_dto(c, user)),
        messages: messages.map(c => message_dto(c, user)),
    });
}

async function messagesPaginate(conversation, skip, limit){}
async function participantsPaginate(conversation, skip, limit){}

/**
 * Думал сделать модель как в telegram, ты не можешь создать беседу без участников и создатель всегда админ.
 * */
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

/**
 * Здесь не должно быть ошибок.
 * При создании заказа нужно будет создать пустую беседу с одним участником - заказчиком.
 * */
async function createConversationWithParticipants(userIds=[], name=`Conversation ${Date.now()}`, type='private_group'){
    if(!userIds || userIds.length === 0){
        throw ApiError.ServerError('users are not provided. Cannot create conversation without participants');
    }

    const conversation = new Conversation({
        name,
        type
    });

    const participants = userIds.map(_userId => new Participant({
        conversation: conversation.id,
        user: _userId,
        role: 'participant'
    }));

    // Важно создать сначала participant-ов и уже потом беседу, чтобы можно было понять кто должен увидеть добавление беседы
    await Promise.all(participants.map(async p => await p.save()));

    await conversation.save();

    // Наверное стоит еще скидывать какое-нибудь init сообщение и добавлять уведомление, типа беседа создана.

    return ({
        conversation: conversation_dto(conversation),
        participants: participants.map(p => participant_dto(p))
    });
}


async function joinConversation(conversationId, user){
    if(!conversationId || !user){
        throw ApiError.ServerError('users are not provided. Cannot create conversation without participants');
    }

    const conversationModel = await Conversation.findById(conversationId);
    if(!conversationModel){
        return console.log(`Conversation does not exist`, conversationId)
    }

    const participant_info = {conversation: conversationId, user: user.id};

    const exist_participant = await Participant.findOne(participant_info);
    if(exist_participant){
        return console.log(`Participant already exists `, exist_participant)
    }

    const p = new Participant(participant_info);

    await p.save();
    await conversationModel.save(); // тот кто вошел должен получить беседу.

    /*
    // script messages on first Manager join
    if(user.role === 'manager'){
        const script_messages = [
            "Ваша заявка принята!",
            `Здравствуйте, меня зовут ${user.name}. Я ваш менеджер консультант `,
            "Данные о заказе, будут отображаться на главной странице и в окне информации чата"
        ]
        // Что будет если сокет выйдет в эти 9 секунд, я хз
        for(let i=0; i<script_messages.length; i++){
            setTimeout(()=>{
                createMessage({
                    type: "text",
                    text: script_messages[i],
                    conversation: conversation.id
                }, socket);
                return;
            }, 1500*(i+1)) // каждые 1.5 сек будут прилетать script_messages[i].
        }
    }*/
}

async function deleteNotifications(notifications){
    /*const Notifications = require('../../models/modelsManager').models.Notification;

    const ids = notifications.map(n => n.id);
    const ns = await Notifications.find({ '_id': { $in: ids } })

    await Promise.all(ns.map(async n => {
        await n.deepDelete();
    }))*/
}

module.exports = ({
    firstLoad,
    createConversationWithParticipants,
    joinConversation,
    messagesPaginate,
    participantsPaginate,
});