const ApiError = require("../../exceptions/ApiError");
const ModelService = require("../helpers/ModelService");
const AdminService = require('../helpers/AdminService');

const { Hotel, Hotel_Room } = require('../../models/models-manager');
const hotelDto = require('../../dtos/hotel/hotel-dto');
const roomDto = require('../../dtos/hotel/hotel-room-dto');
const checkNecessaryFields = require("../helpers/checkNecessaryFields");

const logger = require('../../log/logger')('hotel-room-service');

const adminService = AdminService(Hotel_Room, roomDto, { creatorField: 'creator' });

const modelService = new ModelService(Hotel_Room);

const pagination = require('../helpers/openPagination')(Hotel_Room, roomDto);

async function returnRoom(room_model){
    const hotel_model = await Hotel.findById(room_model.hotel);
    return ({
        'hotel': hotelDto(hotel_model),
        'hotel/room': roomDto(room_model)
    });
}

async function returnRooms(room_models){
    // нужно вместе с комнатами вернуть отели.
    // return room_models.map(m => roomDto(m));
    return await Promise.all(room_models.map(async room_model => {
        return await returnRoom(room_model);
    }))
}

async function findByQueryParams(filters, user) {
    if (!user) {
        throw ApiError.ServerError('user is missing')
    }
    if (!filters) {
        filters = {};
    }

    const pkeys = modelService.get_pkeys(filters);
    if(pkeys.length > 1){
        modelService.moreThanOnePkeyError();
    }

    // Нет pkeys, только какие-то фильтры.
    // При отсутствии фильтров будет выдавать все документы.
    if(pkeys.length < 1){
        const models = await Hotel_Room.find(filters); // запрос на получение документов
        return returnRooms(models);
    }

    // else pkeys.length = 1

    const pkey = pkeys[0];

    const values = filters[pkey].split(','); // разбиваем строку на массив

    delete filters[pkey];

    const models = await Hotel_Room.find({ ...filters, [pkey==='id'?'_id':pkey]: { $in: values } }); // запрос на получение документов
    return returnRooms(models);
}

async function findById(id, user){
    if (!user) {
        throw ApiError.ServerError('user is missing')
    }
    if (!id) {
        throw ApiError.ServerError('id is missing')
    }

    const room = await Hotel_Room.findById(id);

    if(!room){
        throw ApiError.BadRequest('room not found')
    }

    return returnRoom(room);
}

module.exports = ({
    ...adminService,
    findByQueryParams,
    pagination,
    findById
});