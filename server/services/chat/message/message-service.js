const ApiError = require("../../../exceptions/ApiError");
const ModelService = require("../../helpers/ModelService");
const AdminService = require('../../helpers/AdminService');

const { Message, Conversation, Participant, Notification } = require('../../../models/models-manager');
const messageDto = require('../../../dtos/chat/message-dto');
const checkNecessaryFields = require("../../helpers/checkNecessaryFields");
const mongoose = require("mongoose");
const fileService = require("../../file-service");

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
        sort = {createdAt: 1}; // сначала старые
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
    logger.log({ message, files, user });

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
    const conversation = await Conversation.findById(message.conversation);
    if(!conversation){
        throw ApiError.NotFound('conversation not found');
    }

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
        logger.log("m.type === 'file'",{m, files});
    }
    else if(m.type === 'image'){
        logger.log("m.type === 'image'",{m, files});
        if(message['image']) {

            // Здесь нужно учитывать, что под files[key] может быть массив файлов, также и model[key] !!!???

            // delete if file already exist

            const file = await fileService.createFile(message['image'], {
                owner: user.id,
                accessType: 'public',
                // accessHolders: opts.owner ? [...opts.accessHolders, opts.owner] : opts.accessHolders,
            });

            m['image'] = file.id;

            return file;
        }
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
        if(p.user == user.id){
            return;
        }
        const notification = new Notification({
            type: 'message',
            message: m.id,
            conversation: m.conversation,
            user: p.user,
        })

        await notification.save();

        return notification;
    }))

    return messageDto(m, user);
}

async function sendScripts(conversationId){

    // script messages on first Manager join
    const script_messages = [
        "Ваша заявка принята!",
        `Здравствуйте, вас приветствует Concierge Service. Ваш личный менеджер-консультант скоро ответит вам.`,
        "Данные о заказе, будут отображаться на главной странице и в окне информации чата"
    ]
    // Что будет если сокет выйдет в эти 9 секунд, я хз
    for(let i=0; i<script_messages.length; i++){
        setTimeout(()=>{
            sendMessage({
                type: "text",
                text: script_messages[i],
                conversation: conversationId
            }, {}, {id: '6463349a81472c0e599a2771'});
            return;
        }, 1500*(i+1)) // каждые 1.5 сек будут прилетать script_messages[i].
    }
}

module.exports = ({
    ...adminService,
    pagination,
    sendMessage,
    sendScripts
});