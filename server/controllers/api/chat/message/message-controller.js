const ApiError = require("../../../../exceptions/ApiError");

const service = require('../../../../services/chat/message/message-service');

const logger = require('../../../../log/logger')('message-controller');

const StandardController = require('../../../StandardController');
const standardController = StandardController(service);


module.exports = ({
    ...standardController,
});