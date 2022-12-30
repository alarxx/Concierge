
const OrderMetaModel = require('../../../../models/order/Order_Meta');

const orderMetaController = require('../../../controller')(OrderMetaModel);

module.exports = orderMetaController;

