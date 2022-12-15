
const OrderMetaModel = require('../../../models/order/Order_Meta');
const OrderModel = require('../../../models/order/Order');
const BillModel = require('../../../models/payment/Bill');

/**
 * new Order({ customer })
 * new Order_Meta({ order });
 * */
module.exports.c_one = async (req, res) => {
    try{
        const meta = await new OrderMetaModel({}).save();
        const order = await new OrderModel({
            customer: req.user.id,
            meta: meta.id,
        }).save();
        return res.json({doc: order});
    }
    catch(err){
        const errors = Object.keys(err.errors).map(key => err.errors[key].message);
        return res.status(500).json({message: errors});
    }
}
/** All users orders */
module.exports.r_all = async (req, res) => {
    res.json(await OrderModel.find({customer: req.user.id}));
}

/** Returns order of id */
module.exports.r_id = async (req, res) => {
    const doc = await OrderModel.findById(req.params.id);
    if(!doc)
        res.status(404).json({message: 'Not found'});

    if(doc.customer != req.user.id)
        res.status(403).json({message: 'Permission denied'});

    res.json(doc);
};

/** Sets bill */
module.exports.u = async (req, res) => {
    // res.json(await updateOrder(req));
    res.status(500).json({message: 'update not implemented yet'});
}

module.exports.d = async (req, res) => {
    try{
        const order = await OrderModel.findById(req.params.id);

        if(!order)
            res.status(404).json({message: 'Not found'});

        if(order.customer != req.user.id)
            res.status(403).json({message: 'Permission denied'});

        const meta = await OrderMetaModel.findByIdAndDelete(order.meta);

        await order.populate('bookings');
        await Promise.all(order.bookings.map(async doc => await doc.delete()));

        await order.delete();

        return res.json({doc: order});
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
}


module.exports.addBookings = async (req, res) => {

}
module.exports.removeBookings = async (req, res) => {

}
