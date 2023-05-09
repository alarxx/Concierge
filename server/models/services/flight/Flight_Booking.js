const {Schema, model} = require('mongoose');


const BookingSchema = new Schema({
    'flight/ticket': {
        type: Schema.Types.ObjectId,
        ref: 'Flight/Ticket',
        required: true,
        immutable: true,
    },

    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        immutable: true,
    },

    dateOfArrival:{
        type: Date,
    },
    dateOfDeparture:{
        type: Date,
    },
});


BookingSchema.plugin(require('mongoose-unique-validator'));
BookingSchema.plugin(require('../../log-plugin'));


/*BookingSchema.methods.onCreate = async function({req, res, body, user}){
    const Booking = require('../../modelsManager').models.Booking;

    if(body.customer)
        this.customer = body.customer;
    else
        this.customer = user.id;

    // Creating booking

    const booking = new Booking({
        type: 'hotel/booking',
        'hotel/booking': this.id
    });
    this.booking = booking.id;

    const Flight_Services = require('../../modelsManager').models.Flight_Service;

    if(!body['flight/service'])
        await this.validate();

    const flight_service = await Flight_Services.findById(body['flight/service']);

    if(!flight_service)
        return res.status(400).json({error: "Flight/Service not found"});

    booking.service = flight_service.service;

    await booking.save();

    //'flight/service' сетится в модель в controller
}*/

/*BookingSchema.methods.deepDelete = async function(){
    // Должны удалить Bill, File
    await handlers.deleteModels(this, ['bill', 'file', 'booking']);

    await handlers.deleteArraysOfModels(this, []);

    await this.delete();

    return this;
}*/

/*BookingSchema.virtual('current_price').get(function(){
    return this.price - this.price * (this.discount / 100)
});*/

module.exports = model('Flight/Booking', BookingSchema);
