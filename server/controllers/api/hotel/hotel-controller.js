const ApiError = require("../../../exceptions/ApiError");

const service = require('../../../services/hotel/hotel-service');

const logger = require('../../../log/logger')('hotel-controller');

const StandardController = require('../../StandardController');
const standardController = StandardController(service);


module.exports = ({
    ...standardController,
});