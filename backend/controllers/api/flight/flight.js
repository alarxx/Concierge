
const FlightModel = require('../../../models/services/flight/Flight');

const flightController = require('../../controller')({Model:FlightModel});

module.exports = flightController;
