
const HotelClassModel = require('../../../../models/services/hotel/Hotel_Class');

const hotelClassController = require('../../../controller')({Model:HotelClassModel});

module.exports = hotelClassController;
