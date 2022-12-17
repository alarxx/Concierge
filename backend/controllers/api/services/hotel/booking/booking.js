
const HotelBookingModel = require('../../../../../models/services/hotel/Hotel_Booking');
const FileModel = require('../../../../../models/binaries/File');
const BillModel = require('../../../../../models/payment/Bill');


module.exports.c = async (req, res) => {
    try{
        // Здесь можно обойтись без setFields,
        // думаю поможет не забывать о нужности этого метода при update
        const hotelBooking = await new HotelBookingModel({})
            .setFields({
                customer: req.user.id,
                ...req.body
            }).save();
        return res.json(hotelBooking);
    }
    catch(err){
        const errors = Object.keys(err.errors).map(key => err.errors[key].message);
        return res.status(500).json({message: errors});
    }
}


module.exports.r = async (req, res) => {
    if(req.user.role === 'admin' || req.user.role === 'manager')
        res.json(await HotelBookingModel.find(req.query));
    else
        res.json(await HotelBookingModel.find({customer: req.user.id, ...req.query}));
}


module.exports.u = async (req, res) => {
    if(!req.body.id)
        return res.status(400).json({message: '\'id\' field not provided'});

    const hotelBooking = await HotelBookingModel.findById(req.body.id);

    if(!hotelBooking)
        return res.status(404).json({message: 'Hotel Booking not found'});

    if(req.user.role !== 'manager' && hotelBooking.customer != req.user.id)
        return res.status(403).json({message: 'Permission denied'});

    try{
        res.json(await hotelBooking.setFields(req.body).save());
    } catch(err){
        const errors = Object.keys(err.errors).map(key => err.errors[key].message);
        return res.status(500).json({message: errors});
    }
}


module.exports.d = async (req, res) => {
    if(!req.body.id)
        return res.status(400).json({message: '\'id\' field not provided'});

    const hotelBooking = await HotelBookingModel.findById(req.body.id);

    if(!hotelBooking)
        return res.status(404).json({message: 'Hotel Booking not found'});

    if(req.user.role !== 'manager' && hotelBooking.customer != req.user.id)
        return res.status(403).json({message: 'Permission denied'});

    try{
        // Удаляет Bill, File
        await hotelBooking.deepDelete();

        return res.json(hotelBooking);
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
}