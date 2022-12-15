
const OrderMetaModel = require('../../../../models/order/Order_Meta');
const OrderModel = require('../../../../models/order/Order');
const Bill = require('../../../../models/payment/Bill');

module.exports.u = async (req, res) => {
    OrderModel.findById(req.body.order);
    // Поиск Order-а
    // проверка на имение
    // и устанавливаем филды
    // res.json(await updateOrder(req));
    res.json({status: 'fail', message: 'update not implemented yet'});
}
module.exports.addService = async (req, res) => {
    console.log(req.params);
    res.send('kek');
};
module.exports.removeService = async (req, res) => {
    console.log(req.params);
    res.send('kek');
};