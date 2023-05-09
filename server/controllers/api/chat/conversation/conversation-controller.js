const ApiError = require("../../../../exceptions/ApiError");

const service = require('../../../../services/chat/conversation/conversation-service');

const logger = require('../../../../log/logger')('conversation-controller');

const StandardController = require('../../../StandardController');
const standardController = StandardController(service);


module.exports = ({
    ...standardController,
});