
const HotelServiceModel = require('../../../../models/services/hotel/Hotel_Service');

const hotelServiceController = require('../../../controller')({Model:HotelServiceModel});

module.exports = hotelServiceController;
