
const HotelBookingModel = require('../../../../models/services/hotel/Hotel_Booking');

const hotelBookingController = require('../../../controller')({Model: HotelBookingModel});

module.exports = hotelBookingController;
