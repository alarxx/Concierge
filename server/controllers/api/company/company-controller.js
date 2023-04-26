const ApiError = require("../../../exceptions/ApiError");

const service = require('../../../services/company-service');

const logger = require('../../../log/logger')('company-controller');

const StandardController = require('../../StandardController');
const standardController = StandardController(service);


module.exports = ({
    ...standardController,
});