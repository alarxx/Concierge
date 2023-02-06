
const Flight_Booking = require('../../../../models/services/flight/Flight_Booking');

const flightBookingController = require('../../../controller')({Model: Flight_Booking});

module.exports = flightBookingController;
