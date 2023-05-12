const ApiError = require("../../exceptions/ApiError");
const ModelService = require("./../helpers/ModelService");
const AdminService = require('./../helpers/AdminService');

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
        logger.log("found:", {rooms})
        hotel.rooms = rooms;
        return hotel;
    }));
}

async function returnHotels(hotels){
    logger.log("Before attachHotelRooms:", {hotels})
    const res = await attachHotelRooms(hotels.map(hotel => hotelDto(hotel)));
    logger.log("After attachHotelRooms:", {hotels:res})
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

module.exports = ({
    ...adminService,
    pagination,
    findByQueryParams,
});