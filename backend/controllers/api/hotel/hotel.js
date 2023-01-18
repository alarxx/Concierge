
const HotelModel = require('../../../models/services/hotel/Hotel');

const hotelController = require('../../controller')({Model:HotelModel});

module.exports = hotelController;
