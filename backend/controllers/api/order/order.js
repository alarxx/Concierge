
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

/**
 * Скопировал из controller, нет времени обдумывать findById.
 * Дополнительно проверяет, имеет ли запросивший доступ к order.
 * Работает только с параметрами (динамическими route-ами /:id)
 * */
/*orderController.findById = async (req, res) => {
    log(colors.cyan(`### FIND BY ID (${orderController.modelName}) ###`));
    const { id } = req.params;
    if(!id){
        log(colors.red("In what case can there be no id?"));
        log(colors.red('###########################################'));
        return res.status(500).json({error: "Path `id` is required. Something went wrong"});
    }
    const model = await orderController.Model.findById(id);

    if (!model){
        log(colors.red("Model not found"));
        log(colors.red('###########################################'));
        return res.status(404).json({error: `${orderController.modelName} not found`});
    }

    if(req.user.role !== 'manager' || model.customer != req.user.id){
        log(colors.red("Permission denied. Forbidden"));
        log(colors.red('###########################################'));
        return res.status(403).json({error: `Permission denied. Forbidden`});
    }

    log(model);
    res.json(model);
    log(colors.cyan('###########################################'));
}*/

module.exports = orderController;
