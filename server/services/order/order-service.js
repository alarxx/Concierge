const ApiError = require("../../exceptions/ApiError");

const { Order } = require('../../models/models-manager');
const orderDto = require('../../dtos/order-dto');

const logger = require('../../log/logger')('order-service');

const ModelService = require("../helpers/ModelService");
const bookingsService = require('../bookings/bookings-service');

const checkNecessaryFields = require("../helpers/checkNecessaryFields");

const modelService = new ModelService(Order);

/**
 * Поиск заказов по параметрам.
 * Если пользователь клиент, то ему возвращаются только его заказы.
 * Скорее всего нужно будет добавить какой-нибудь массив accessHolders.
 * */
async function findByQueryParams(filters, user) {
    async function returnOrders(orders){
        return await Promise.all(orders.map(async o => {
            await bookingsService.populateBookings(o);
            return orderDto(o, user);
        }));
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
        const orders = await Order.find(_filters); // запрос на получение документов
        return await returnOrders(orders);
    }

    // else pkeys.length = 1

    const pkey = pkeys[0];

    const values = _filters[pkey].split(','); // разбиваем строку на массив

    delete _filters[pkey];

    const orders = await Order.find({ ..._filters, [pkey==='id'?'_id':pkey]: { $in: values } }); // запрос на получение документов

    return await returnOrders(orders);
}


async function createOne(body, files, user) {
    if (!files) {
        files = {};
    }
    if (!user) {
        throw ApiError.ServerError('user is missing');
    }

    let _body = { ...body };

    await modelService.deleteInvalidFileFields(_body);

    const bookings = _body.bookings ? _body.bookings : [];
    delete _body.bookings;

    // Order не может заказать менеджер за клиента. Всегда должен заказывать клиент, менеджер же может добавлять.
    const order = new Order({ ..._body, customer: user.id });

    // Здесь нужно обработать bookings.
    // Создаем и присваем id-шки
    order.bookings = await bookingsService.createMany(bookings, order, files);

    await modelService.saveWithFiles(order, files, { user });

    // Здесь я должен создать чат

    return orderDto(order, user);
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

    const _body = { ...body };

    const pkey = modelService.get_pkey(_body);

    const order = await Order.findOne({[(pkey === 'id' ? '_id' : pkey)]: _body[pkey]});
    if (!order) {
        throw ApiError.NotFound(`Order not found`);
    }


    const bookings = _body.bookings ? _body.bookings : [];
    delete _body.bookings;

    order.bookings = await bookingsService.updateMany(bookings, order, files);

    /*
    * Здесь нужна проверка есть ли строка файла, но там нет файла
    * Это нужно, чтобы удалять файлы.
    * */
    /* Следующие 2 строчки можно объединить и назвать set */
    await modelService.deleteInvalidFileFields(_body, order);
    order.set(_body);


    await modelService.saveWithFiles(order, files, { user });

    return orderDto(order, user);
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

    // Нужно сделать проверку и удалить все Booking-и прикрепленные к order.
    await bookingsService.deleteMany(order.bookings);

    await Order.findOneAndDelete({[(pkey === 'id' ? '_id' : pkey)]: body[pkey]});

    await modelService.deleteAttachedFiles(order);

    return orderDto(order, user);
}


module.exports = ({
    createOne,
    findByQueryParams,
    updateOne,
    deleteOne
});