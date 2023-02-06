
const Flight_Service = require('../../../../models/services/flight/Flight_Service');

const flightServiceController = require('../../../controller')({Model:Flight_Service});

module.exports = flightServiceController;
