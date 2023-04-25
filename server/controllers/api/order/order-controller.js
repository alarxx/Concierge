const ApiError = require("../../../exceptions/ApiError");

const orderService = require('../../../services/order/order-service');

const logger = require('../../../log/logger')('order-controller');

const StandardController = require('../../StandardController');
const standardController = StandardController(orderService);

module.exports = ({
    ...standardController,
});