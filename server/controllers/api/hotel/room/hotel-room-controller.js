const ApiError = require("../../../../exceptions/ApiError");

const service = require('../../../../services/hotel/hotel-room-service');

const logger = require('../../../../log/logger')('hotel-room-controller');

const StandardController = require('../../../StandardController');
const standardController = StandardController(service);


module.exports = ({
    ...standardController,
});