const ApiError = require("../../exceptions/ApiError");
const ModelService = require("./../helpers/ModelService");
const AdminService = require('./../helpers/AdminService');
const cityService = require('./../city-service');

const { Hotel, Hotel_Room } = require('../../models/models-manager');
const hotelDto = require('../../dtos/hotel/hotel-dto');
const checkNecessaryFields = require("../helpers/checkNecessaryFields");

const logger = require('../../log/logger')('hotel-service');

const adminService = AdminService(Hotel, hotelDto, { creatorField: 'creator' });

const modelService = new ModelService(Hotel);

const findByQueryParams = require('../helpers/openFindByQueryParams')(Hotel, hotelDto);

async function attachHotelRooms(hotels){
    return await Promise.all(hotels.map(async hotel => {
        const rooms = await Hotel_Room.find({ hotel: hotel._id });
        // logger.log("found:", {rooms})
        hotel['hotel/rooms'] = rooms;
        return hotel;
    }));
}

async function returnHotels(hotels){
    const res = await attachHotelRooms(hotels.map(hotel => hotelDto(hotel)));
    return res;
}

async function pagination(filters, user) {
    if (!user) {
        throw ApiError.ServerError('user is missing')
    }

    checkNecessaryFields(filters, ['skip', 'limit']);

    const {skip, limit} = filters;
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

    const hotels = await Hotel.find(filters)
        .sort(sort)
        .skip(skip)
        .limit(limit);

    return returnHotels(hotels);
}

async function createOne(body, files, user) {
    if (!files) {
        files = {};
    }
    if (!user) {
        throw ApiError.ServerError('user is missing');
    }
    if(user.role !== 'admin'){
        throw ApiError.Forbidden('Permission denied. Only for admins.');
    }

    // Нужно найти unique поля?
    // Можно просто засетить полностью и попытаться сохранить с файлами
    await modelService.deleteInvalidFileFields(body);

    const model = new Hotel({...body, creator: user.id});

    // logger.log("createOne", {body, model});

    // validate city
    await model.validate();
    await cityService.checkCityExists(model.city);

    await modelService.saveWithFiles(model, files, { user });

    return model; // dto(model);
}

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

    const model = await Hotel.findOne({[(pkey === 'id' ? '_id' : pkey)]: body[pkey]});
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

    // validate city
    await model.validate();
    await cityService.checkCityExists(model.city);

    await modelService.saveWithFiles(model, files, { user });

    return model; // dto(model);
}


module.exports = ({
    ...adminService,
    pagination,
    findByQueryParams,
    createOne,
    updateOne
});