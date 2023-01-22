// Здесь же не может быть проблемы циркулярных зависимостей, можно и без modelManager-а пока
const ConversationModel = require('../../../models/chat/Conversation');
const MessageModel = require('../../../models/chat/Message');
const ParticipantModel = require('../../../models/chat/Participant');
const NotificationModel = require('../../../models/chat/Notification');

const controller = {};

/**
 * Выдает все данные чата юзера сделавшего запрос.
 * Conversations,
 * Messages,
 * Participants,
 * Notifications,
 * */
controller.preload = async (req, res) => {
    const user = req.user.id;

    // Каждый Participant означает принадлежность в одну беседу того, кто запрашивает
    const memberOf = await ParticipantModel.find({ user })

    const conversations_ids = memberOf.map(member => member.conversation);

    const participants = await ParticipantModel.find({ 'conversation': { $in: conversations_ids } })

    const conversations = await ConversationModel.find({ '_id': { $in: conversations_ids } })

    /*
    Нужно наверное добавить проверку на разницу найденных conversations.length и participants.length !!! В идеальном случае проблем быть не должно.
    Если количество найденных элементов не совпадает с количеством требуемых, то сообщаем какие id не найдены.
    */

    const messages = await MessageModel.find({ 'conversation': { $in: conversations_ids } })

    const notifications = await NotificationModel.find({ user })

    res.status(200).json({
        conversations,
        participants,
        messages,
        notifications
    });
}

module.exports = controller;