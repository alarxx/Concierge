const ApiError = require("../../../../exceptions/ApiError");

const service = require('../../../../services/chat/participant/participant-service');

const logger = require('../../../../log/logger')('participant-controller');

const StandardController = require('../../../StandardController');
const standardController = StandardController(service);


module.exports = ({
    ...standardController,
});