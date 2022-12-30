const BookingModel = require('../../../models/services/Booking');

/** Создать может любой */
/*{
    type: 'service*_booking',
    service*_booking: id
}*/
module.exports.c = async (req, res) => {
    const exist = await BookingModel.findOne(req.body)
    if(exist)
        return res.status(409).json(exist);

    try{
        // Здесь можно обойтись без setFields,
        // думаю поможет не забывать о нужности этого метода при update
        const booking = await new BookingModel({}).setFields(req.body).save();

        return res.json(booking);
    }
    catch(err){
        const errors = Object.keys(err.errors).map(key => err.errors[key].message);
        return res.status(500).json({message: errors});
    }
}

module.exports.r = async (req, res) => {
    const bookings = await BookingModel.find(req.query);

    if(req.user.role === 'manager')
        return res.json(bookings);

    await Promise.all(bookings.map(async b => await b.populate(b.type)));

    const accessIsAllowed = bookings.filter(booking => booking[booking.type].customer == req.user.id)

    res.json(accessIsAllowed);
}


module.exports.d = async (req, res) => {
    try{
        const booking = await BookingModel.findOne(req.body);

        if(!booking)
            return res.status(404).json({message: 'Booking not found'});

        // Проверка доступа
        await booking.populate(booking.type)
        if(booking[booking.type].customer == req.user.id)
            return res.status(403).json({message: 'Permission denied'});

        await booking.deepDelete();

        return res.json(booking);
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
}