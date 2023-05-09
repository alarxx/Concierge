const ApiError = require("../../../exceptions/ApiError");

const service = require('../../../services/city-service');

const logger = require('../../../log/logger')('city-controller');

const StandardController = require('../../StandardController');
const standardController = StandardController(service);


module.exports = ({
    ...standardController,
});