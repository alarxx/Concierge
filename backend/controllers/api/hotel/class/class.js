
const HotelClassModel = require('../../../../models/services/hotel/Hotel_Class');

const hotelClassController = require('../../../controller')(HotelClassModel);

module.exports = hotelClassController;
