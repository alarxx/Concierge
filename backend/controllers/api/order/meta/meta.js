
const OrderMetaModel = require('../../../../models/order/Order_Meta');

const orderMetaController = require('../../../controller')({Model: OrderMetaModel});

module.exports = orderMetaController;

