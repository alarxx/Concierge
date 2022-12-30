
const HotelModel = require('../../../models/services/hotel/Hotel');

const hotelController = require('../../controller')(HotelModel);

module.exports = hotelController;
