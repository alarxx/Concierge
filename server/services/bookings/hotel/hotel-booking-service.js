const ApiError = require("../../../exceptions/ApiError");
const ModelService = require("../../helpers/ModelService");

const { Hotel_Booking } = require('../../../models/models-manager');
const hotelBookingDto = require('../../../dtos/hotel/hotel-booking-dto');

const logger = require('../../../log/logger')('hotel-booking-service');

const modelService = new ModelService(Hotel_Booking);

/**
 * Просто назначает нужные поля и создает Hotel_Booking.
 * */
async function createHotelBookingWithoutSave(body, orderId, customerId, files){
    if(!orderId || !customerId){
        throw ApiError.ServerError('No required arguments');
    }

    // booking = { 'hotel/room': ObjectId, ... }

    // order и customer назначаем последними
    return new Hotel_Booking({
        ...body,
        order: orderId,
        customer: customerId
    });
}

/**
 * На этом этапе мы уверены, что order содержит booking.
 * */
async function updateHotelBookingWithoutSave(body, orderId, customerId, files){
    const model = await Hotel_Booking.findById(body.id);

    if(!model){
        // Как может случиться, что в Order.bookings есть такой booking.id, а вообще такого документа нет? Это никогда не должно происходить.
        throw ApiError.NotFound(`Impossible. Hotel_Booking(${body.id}) not found.`);
    }
    if(model.order != orderId || model.customer != customerId){
        // Как может случиться, что в Order.bookings есть такой booking.id, а вообще такого документа нет? Это никогда не должно происходить.
        throw ApiError.BadRequest(`Impossible. Invalid booking or order data. Please check the provided booking(${body.id}).`);
    }

    model.set(body);

    return model;
}

async function deleteHotelBooking(id){
    const hotelBooking = await Hotel_Booking.findById(id);
    logger.log(`delete hotel booking(${id}):`, hotelBooking)
    if(!hotelBooking){
        return;
    }
    // deleteAttachedFiles
    return await Hotel_Booking.findOneAndDelete({ _id: id });
}

async function saveHotelBooking(model, files){
    // Пока что без файлов.
    return await model.save();
}


module.exports = ({
    createHotelBookingWithoutSave,
    updateHotelBookingWithoutSave,
    deleteHotelBooking,
    saveHotelBooking,
});