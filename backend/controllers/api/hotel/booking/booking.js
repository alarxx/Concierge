
const HotelBookingModel = require('../../../../models/services/hotel/Hotel_Booking');

const hotelBookingController = require('../../../controller')(HotelBookingModel);

module.exports = hotelBookingController;
