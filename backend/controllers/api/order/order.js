
const OrderModel = require('../../../models/order/Order');

const orderController = require('../../controller')({Model: OrderModel, nestedObjectKeys:['meta']});

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

orderController.roleAccess = (req,res, next) => {
    // console.log(res.locals.model.customer, req.user.id);
    if(req.user.role!=='manager'/*|| res.locals.model.customer != req.user.id*/)
        return res.status(403).json({error: `You are not the manager${''/* or creator of this order*/}. Access denied`});
    next();
}

orderController.deleteAll = async (req, res) => {
    const orders = await OrderModel.find();
    await Promise.all(orders.map(async order=>{
        await order.deepDelete();
    }))
    res.json(orders);
}

module.exports = orderController;
