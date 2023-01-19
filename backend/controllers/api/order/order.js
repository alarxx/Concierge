
const OrderModel = require('../../../models/order/Order');

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
    if(req.user.role!=='manager')
        return res.status(403).json({error: `Access denied. You are not the manager.`});
    next();
}

orderController.deleteAll = async (req, res) => {
    if(!req.isAuthenticated())
        return res.status(401).json({error: 'Unauthorized'});
    if(req.user.role !== 'manager')
        return res.status(403).json({error: `Access denied. You are not the manager.`});

    const orders = await OrderModel.find();

    try {
        await Promise.all(orders.map(async order=>{
            await order.deepDelete();
        }))
        return res.json({orders, message: 'successfully deleted'});
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
}

module.exports = orderController;
