const ApiError = require("../../../../exceptions/ApiError");

const service = require('../../../../services/chat/notification/notification-service');

const logger = require('../../../../log/logger')('company-controller');

const StandardController = require('../../../StandardController');
const standardController = StandardController(service);


module.exports = ({
    ...standardController,
});