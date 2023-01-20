
const OrderModel = require('../../../models/order/Order');
const colors = require("../../../logging/colors");
const log = require("../../../logging/log");

const orderController = require('../../controller')({Model: OrderModel});

orderController.find = async (req, res, next) => {
    const params = {...req.query}

    if(params.id){
        params._id = params.id;
        delete params.id;
    }

    if(req.user.role !== 'manager') {
        params.customer = req.user.id;
    }

    res.locals.models = await OrderModel.find(params);

    next();
}

orderController.access = (req, res, next) => {
    if(req.user.role !== 'manager'){
        console.log(colors.red('Request denied. User role is not manager'));
        return res.status(403).json({error: `Access denied. You are not the manager.`});
    }
    next();
}

orderController.deleteAll = async (req, res) => {
    const orders = await OrderModel.find();

    try {
        log(colors.cyan(`### DELETE ALL (${orderController.modelName}) ###`));
        await Promise.all(orders.map(async order=>{
            await order.deepDelete();
        }))
        log(colors.cyan('###########################################'));

        return res.json({orders, message: 'successfully deleted'});
    } catch (err) {
        return orderController.handleError(req, res, err)
    }
}

module.exports = orderController;
