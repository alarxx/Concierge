
const OrderModel = require('../../../models/order/Order');

const orderController = require('../../controller')(OrderModel);

module.exports = orderController;
