const ApiError = require("../../../exceptions/ApiError");
const ModelService = require("../../helpers/ModelService");

const { Hotel_Booking } = require('../../../models/models-manager');
const hotelBookingDto = require('../../../dtos/hotel/hotel-booking-dto');

const logger = require('../../../log/logger')('hotel-booking-service');

const modelService = new ModelService(Hotel_Booking);

async function createHotelBooking(booking, customer){
    return await new Hotel_Booking({ ...booking, customer }).save();
}

async function updateHotelBooking(model, booking){
    return model.set(booking).save();
}

async function deleteHotelBooking(model){
    return await Hotel_Booking.findOneAndDelete({ _id: model.id });
}

module.exports = ({
    createHotelBooking,
    updateHotelBooking,
    deleteHotelBooking
});