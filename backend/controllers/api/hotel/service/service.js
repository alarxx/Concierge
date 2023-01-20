
const HotelClassModel = require('../../../../models/services/hotel/Hotel_Service');

const hotelClassController = require('../../../controller')({Model:HotelClassModel});

module.exports = hotelClassController;
