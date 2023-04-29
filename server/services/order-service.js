
const { Order: Model } = require('../models/models-manager');
const orderDto = require('../dtos/order-dto');

const logger = require('../log/logger')('order-service');

const ModelService = require("./helpers/ModelService");
const ApiError = require("../exceptions/ApiError");
const checkNecessaryFields = require("./helpers/checkNecessaryFields");

const modelService = new ModelService(Model);

async function createOne(body, files, user) {
    if (!files) {
        files = {};
    }
    if (!user) {
        throw ApiError.ServerError('user is missing');
    }

    // Здесь нужно обработать Booking

    await modelService.deleteInvalidFileFields(body);

    const model = new Model({...body, customer: user.id});

    // logger.log("createOne", {body, model});

    await modelService.saveWithFiles(model, files, { user });

    return model; // dto(model);
}


/**
 * Скорее всего у разных моделей будет разный find.
 * Где-то нужно только одну модель найти, где-то по id-шке, где-то сразу по нескольким id-шкам.
 * Где-то нужно не по отдельности искать, а нужна пагинация массива документов.
 * */
async function findByQueryParams(filters, user) {
    if (!user) {
        throw ApiError.ServerError('user is missing')
    }
    if(user.role !== 'admin'){
        throw ApiError.Forbidden('Permission denied. Only for admins.');
    }

    if (!filters) {
        filters = {};
    }

    // В массиве прилетает запрос

    const pkeys = modelService.get_pkeys(filters);
    if(pkeys.length > 1){
        modelService.moreThanOnePkeyError();
    }

    // Нет pkeys, только какие-то фильтры.
    // При отсутствии фильтров будет выдавать все документы.
    if(pkeys.length < 1){
        return await Model.find(filters); // запрос на получение документов
    }

    // else pkeys.length = 1

    const pkey = pkeys[0];

    const values = filters[pkey].split(','); // разбиваем строку на массив

    delete filters[pkey];

    const models = await Model.find({ ...filters, [pkey==='id'?'_id':pkey]: { $in: values } }); // запрос на получение документов

    // Здесь нужно раскрыть все букинги

    return models; // models.map(m => dto(m));
}


// Это нужно писать отталкиваясь от createOne
async function updateOne(body, files, user) {
    if(!files){
        files = {};
    }
    if(!body){
        body = {};
    }

    if (!user) {
        throw ApiError.ServerError('user is missing')
    }
    if(user.role !== 'admin'){
        throw ApiError.Forbidden('Permission denied. Only for admins.');
    }
    if (Object.keys(body).length + Object.keys(files).length < 2) {
        throw ApiError.BadRequest("Empty request body or too few fields");
    }

    const pkey = modelService.get_pkey(body);

    const model = await Model.findOne({[(pkey === 'id' ? '_id' : pkey)]: body[pkey]});
    if (!model) {
        throw ApiError.NotFound(`${modelService.modelName} not found`)
    }

    /*
    * Здесь нужна проверка есть ли строка файла, но там нет файла
    * Это нужно, чтобы удалять файлы.
    * */
    /* Следующие 2 строчки можно объединить и назвать set */
    await modelService.deleteInvalidFileFields(body, model);
    model.set(body);

    await modelService.saveWithFiles(model, files, { user });

    return model; // dto(model);
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
    const model = await Model.findOne({[(pkey === 'id' ? '_id' : pkey)]: body[pkey]});
    if (!model) {
        throw ApiError.NotFound(`${modelService.modelName} not found`);
    }
    /*if (user.role !== 'admin' && model[opts.creatorField] != user.id) {
        throw ApiError.Forbidden('Permission denied');
    }*/

    // Нужно сделать проверку и удалить все Booking-и прикрепленные к order.

    await Model.findOneAndDelete({[(pkey === 'id' ? '_id' : pkey)]: body[pkey]});

    await modelService.deleteAttachedFiles(model);

    return model; // dto(model);
}


module.exports = ({
    createOne,
    findByQueryParams,
    updateOne,
    deleteOne
});