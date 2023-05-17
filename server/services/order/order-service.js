const ApiError = require("../../exceptions/ApiError");

const { Order, User } = require('../../models/models-manager');
const orderDto = require('../../dtos/order-dto');
const asyncOrderDto = require('../../dtos/async/order-dto');

const logger = require('../../log/logger')('order-service');

const ModelService = require("../helpers/ModelService");
const bookingsService = require('../bookings/bookings-service');
const chatService = require('../chat/chat-service');
const conversationService = require('../chat/conversation/conversation-service');
const messageService = require('../chat/message/message-service');

const checkNecessaryFields = require("../helpers/checkNecessaryFields");
const conversation_dto = require("../../dtos/chat/conversation-dto");
const participant_dto = require("../../dtos/chat/participant-dto");

const modelService = new ModelService(Order);

/**
 * Поиск заказов по параметрам.
 * Если пользователь клиент, то ему возвращаются только его заказы.
 * Скорее всего нужно будет добавить какой-нибудь массив accessHolders.
 * */
async function findByQueryParams(filters, user) {
    async function returnOrders(orders){
        return await Promise.all(orders.map(async o => await asyncOrderDto(o, user)));
    }

    let _filters = { ...filters };

    if (!user) {
        throw ApiError.ServerError('user is missing');
    }

    const pkeys = modelService.get_pkeys(_filters);
    if(pkeys.length > 1){
        modelService.moreThanOnePkeyError();
    }

    if(user.role !== 'admin'){
        _filters.customer = user.id;
    }

    // Нет pkeys, только какие-то фильтры.
    // При отсутствии фильтров будет выдавать все документы.
    if(pkeys.length < 1){
        const orders = await Order.find(_filters).sort({createdAt: 1}); // запрос на получение документов
        return await returnOrders(orders);
    }

    // else pkeys.length = 1

    const pkey = pkeys[0];

    const values = _filters[pkey].split(','); // разбиваем строку на массив

    delete _filters[pkey];

    const orders = await Order.find({ ..._filters, [pkey==='id'?'_id':pkey]: { $in: values } }).sort({createdAt: 1}); // запрос на получение документов

    return await returnOrders(orders);
}


async function createOne(body, files, user) {
    if (!files) {
        files = {};
    }
    if (!user) {
        throw ApiError.ServerError('user is missing');
    }

    /** Define. Определяем. */

    let _body = { ...body };

    const bookings = _body.bookings ? _body.bookings : [];
    delete _body.bookings;

    await modelService.deleteInvalidFileFields(_body);

    /** define order */
    // Order не может заказать менеджер за клиента. Всегда должен заказывать клиент, менеджер же может добавлять.
    const order = new Order({ ..._body, customer: user.id });

    /** define bookings */
    // Создаем и присваем id-шки
    const extended_bookings = await bookingsService.defineMany(bookings, order, files);

    order.bookings = extended_bookings.map(booking => {
        const type = booking.type;
        const model = booking[booking.type];
        return ({
            type: type,
            [type]: model.id
        })
    });

    /** define conversation with participants(customer user itself) */
    // Здесь я должен создать чат
    const {conversation, participants} = await chatService.defineConversationWithParticipant([user.id]);

    order.conversation = conversation.id;

    logger.log("createOne:", {order, extended_bookings, conversation, participants});

    /** Validate. Валидируем. */
    await order.validate();

    await bookingsService.saveMany(extended_bookings, files);

    /* Сохраняем */
    await chatService.saveConversationWithParticipants(conversation, participants);

    await modelService.saveWithFiles(order, files, { user });

    await messageService.sendScripts(conversation.id);


    return ({
        order: orderDto(order, user),
        conversation: conversation_dto(conversation),
        participants: participants.map(p => participant_dto(p))
    });
}


async function updateOne(body, files, user) {
    if(!body){
        throw ApiError.ServerError('request body is missing');
    }
    if (!user) {
        throw ApiError.ServerError('user is missing');
    }
    if (!files) {
        files = {};
    }
    if (Object.keys(body).length + Object.keys(files).length < 2) {
        throw ApiError.BadRequest("Empty request body or too few fields");
    }

    /** Define. Определяем. */

    const _body = { ...body };

    /** define order */
    const pkey = modelService.get_pkey(_body);
    const order = await Order.findOne({[(pkey === 'id' ? '_id' : pkey)]: _body[pkey]});
    if (!order) {
        throw ApiError.NotFound(`Order not found`);
    }

    /** define bookings */
    const bookings = _body.bookings ? _body.bookings : [];
    delete _body.bookings;

    const extended_bookings = await bookingsService.updateMany(bookings, order, files);

    order.bookings = extended_bookings.map(booking => {
        const type = booking.type;
        const model = booking[booking.type];
        return ({
            type: type,
            [type]: model.id
        })
    });

    /*
    * Здесь нужна проверка есть ли строка файла, но там нет файла
    * Это нужно, чтобы удалять файлы.
    * */
    /* Следующие 2 строчки можно объединить и назвать set */
    await modelService.deleteInvalidFileFields(_body, order);
    order.set(_body);

    await order.validate();

    await bookingsService.saveMany(extended_bookings, files);

    await modelService.saveWithFiles(order, files, { user });

    return ({
        order: orderDto(order, user)
    });
}

async function deleteOne(body, user) {
    if (!body || !user) {
        throw ApiError.ServerError('Some required arguments are missing')
    }
    if(user.role !== 'admin'){
        throw ApiError.Forbidden('Permission denied. Only for admins.');
    }
    if (Object.keys(body).length === 0) {
        throw ApiError.BadRequest("Empty request body");
    }

    const pkey = modelService.get_pkey(body);

    /* нужно удалять все что связанно с моделью и должны быть удалено вместе с пользователем, например аватарку */
    const order = await Order.findOne({[(pkey === 'id' ? '_id' : pkey)]: body[pkey]});
    if (!order) {
        throw ApiError.NotFound(`${modelService.modelName} not found`);
    }

    /** Может ли отсюда выйти неопределенное состояние? */

    // Нужно сделать проверку и удалить все Booking-и прикрепленные к order.
    await bookingsService.deleteMany(order.bookings)
        .catch(logger.log);

    await Order.findOneAndDelete({[(pkey === 'id' ? '_id' : pkey)]: body[pkey]})
        .catch(logger.log);

    await modelService.deleteAttachedFiles(order)
        .catch(logger.log);

    // нужно удалить conversation, всех participant-ов, message-ы и notifications
    await conversationService.deepDelete(order.conversation)
        .catch(logger.log);

    return ({
        order: orderDto(order, user)
    });
}


async function takeOrder(order, user){
    if(!order || !user){
        throw ApiError.ServerError('Some required arguments are missing');
    }
    if(user.role !== 'admin'){
        throw ApiError.Forbidden('Permission denied, only for admins');
    }
    // change status of order.
    const orderModel = await Order.findById(order.id);
    if(!orderModel){
        throw ApiError.NotFound(`Order not found`);
    }
    logger.log("takeOrder:", {orderModel})
    orderModel.status = 'handling';
    orderModel.manager = user.id;
    await orderModel.save();
    // join conversation,
    await chatService.joinConversation(order.conversation, user);
}


module.exports = ({
    createOne,
    findByQueryParams,
    updateOne,
    deleteOne,
    takeOrder
});