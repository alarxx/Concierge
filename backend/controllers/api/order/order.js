
const OrderModel = require('../../../models/order/Order');
const OrderMetaModel = require('../../../models/order/Order_Meta');
const BookingModel = require('../../../models/services/Booking');
const BillModel = require('../../../models/payment/Bill');
const FileModel = require("../../../models/binaries/File");

/**
 * new Order({ customer })
 * new Order_Meta({ order });
 * */
module.exports.c = async (req, res) => {
    try{
        const order = new OrderModel({}).setFields({
            customer: req.user.id,
            // meta: meta.id,
            ...req.body,
        });
        const meta = await new OrderMetaModel({order: order.id}).save();
        return res.json(await order.save());
    }
    catch(err){
        const errors = Object.keys(err.errors).map(key => err.errors[key].message);
        return res.status(500).json({message: errors});
    }
}
/** All users orders */
module.exports.r = async (req, res) => {
    const obj = {...req.query};

    if (req.user.role === 'client')
        obj.customer = req.user.id

    res.json(await OrderModel.find(obj));
}

/** Sets bill */
module.exports.u = async (req, res) => {
    if(!req.body.id)
        return res.status(400).json({message: '\'id\' field not provided'});

    const order = await OrderModel.findById(req.body.id);

    if(!order)
        return res.status(404).json({message: 'Order not found'});

    if(req.user.role !== 'manager' && order.customer != req.user.id)
        return res.status(403).json({message: 'Permission denied'});

    try{
        res.json(await order.setFields(req.body).save());
    } catch(err){
        const errors = Object.keys(err.errors).map(key => err.errors[key].message);
        return res.status(500).json({message: errors});
    }
}

module.exports.d = async (req, res) => {
    try{
        if(!req.body.id)
            return res.status(400).json({message: '\'id\' field not provided'});

        const order = await OrderModel.findById(req.body.id);

        if(!order)
            res.status(404).json({message: 'Order not found'});

        if(req.user.role === 'client' && order.customer != req.user.id)
            res.status(403).json({message: 'Permission denied'});

        await order.deepDelete();

        return res.json(order);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: err.message});
    }
}


module.exports.addBooking = async (req, res) => {
    const {id, booking} = req.body;

    if(!id)
        return res.status(400).json({message: '\'id\' field not provided'});
    if(!booking)
        return res.status(400).json({message: '\'booking\' field not provided'});

    const bookingFound = await BookingModel.findById(booking);
    if(!bookingFound)
        return res.status(404).json({message: 'Booking not found. You are trying to place a booking that doesn\'t exist'});

    const order = await OrderModel.findById(id);
    if(!order)
        return res.status(404).json({message: 'Order not found'});

    const index = order.bookings.indexOf(booking)
    if(index > -1)
        return res.status(400).json({message: `The booking of id(${booking}) is already in the order.bookings array`});

    try{
        order.bookings.push(booking)
        res.json(await order.save());
    }
    catch(err){
        res.json({message: err.message});
    }
}


module.exports.removeBooking = async (req, res) => {
    const {id, booking} = req.body;

    if (!id)
        return res.status(400).json({message: '\'id\' field not provided'});
    if (!booking)
        return res.status(400).json({message: '\'booking\' field not provided'});

    const order = await OrderModel.findById(id);
    if (!order)
        return res.status(404).json({message: 'Order not found'});

    // Удаляем объект из массива файлов поста
    const index = order.bookings.indexOf(booking)
    if (index === -1)
        return res.status(404).json({message: 'Booking is not in the order.bookings array'});

    try {
        order.bookings.splice(index, 1);
        res.json(await order.save());
    }catch(e){
        res.json(500).json({message: e.message});
    }
}
