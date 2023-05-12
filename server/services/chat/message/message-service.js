const ApiError = require("../../../exceptions/ApiError");
const ModelService = require("../../helpers/ModelService");
const AdminService = require('../../helpers/AdminService');

const { Message, Conversation, Participant } = require('../../../models/models-manager');
const messageDto = require('../../../dtos/chat/message-dto');
const checkNecessaryFields = require("../../helpers/checkNecessaryFields");

const logger = require('../../../log/logger')('message-service');

const adminService = AdminService(Message, messageDto, { creatorField: 'sender' });

const modelService = new ModelService(Message);

async function pagination(filters, user){ //, skip, limit, sort) { // query
    if (!user) {
        throw ApiError.ServerError('user is missing')
    }
    // if(user.role !== 'admin'){
    //     throw ApiError.Forbidden('Permission denied. Only for admins.');
    // }

    checkNecessaryFields(filters, ['skip', 'limit', 'conversation']);

    const { skip, limit, conversation } = filters;

    const participation = await Participant.find({ conversation, user: user.id });
    if(!participation){
        throw ApiError.Forbidden(`Permission to conversation(${conversation}) denied`);
    }

    // Все эти значения string, выглядеть будут примерно так -createdAt, потом нужно будет распарсить.
    // А что если сделать сортировку по несуществующему полю?
    // Потом нужно удалить из filters эти значения

    let sort;
    if (!filters.sort) {
        sort = {createdAt: -1}; // сначала новые?
    } else {
        const _sort = filters.sort;
        const fieldName = _sort.startsWith('-') ? _sort.slice(1) : _sort;
        const sortDirection = _sort.startsWith('-') ? -1 : 1;
        sort = {[fieldName]: sortDirection}
    }

    delete filters.skip;
    delete filters.limit;
    delete filters.sort;

    const items = await Message.find(filters)
        .sort(sort)
        .skip(skip)
        .limit(limit);

    return items.map(item => messageDto(item));
}

async function sendMessage(message, files, user) {
    if (!files) {
        files = {};
    }
    if (!user) {
        throw ApiError.ServerError('user is missing');
    }

    // Нужно найти unique поля?
    // Можно просто засетить полностью и попытаться сохранить с файлами
    await modelService.deleteInvalidFileFields(message);

    // Проверить состоит ли пользователь в conversation

    //Нужно не только тупое сохранение сделать, но и изменение
    let m = message.id ?
        await Message.findById(message.id) :
        new Message({
            sender: user.id,
            ...message
        });

    if(!m) {
        // Если id есть, но сообщение не найдено
        throw ApiError.NotFound('Message not found');
    }

    // logger.log("sendMessage", {message, model});

    if(m.type === 'text'){
        m.text = message.text;
    }
    else if(m.type === 'choice'){
        m.choice.selectedServices = message.choice.selectedServices;
        if(message.id){
            m.choice.submitted = true;
        }
    }
    // А когда файл? Нужно сохранить file и установить его id в message.file
    else if(m.type === 'file'){
        console.log(m);
    }
    else {
        throw ApiError.BadRequest('Bad message type');
    } // ничего не делаем при других type пока

    await m.validate();
    // Нужно прикреплять файлы
    // await modelService.saveWithFiles(m, files, { user });

    await m.save();


    // Отправить всем уведомление
    const participants = await Participant.find({ conversation: message.conversation });

    await Promise.all(participants.map(async p => {
        const notification = new Notification({
            type: 'message',
            message: m.id,
            user: p.user,
        })

        await notification.save();

        return notification;
    }))

    return messageDto(m, user);
}

module.exports = ({
    ...adminService,
    pagination,
    sendMessage,
});