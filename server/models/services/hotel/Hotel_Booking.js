const {Schema, model} = require('mongoose');


const BookingSchema = new Schema({
    booking:{
        type: Schema.Types.ObjectId,
        ref: 'Booking',
        required: true,
        immutable: true,
        unique: true,
    },
    'hotel/service': {
        type: Schema.Types.ObjectId,
        ref: 'Hotel/Service',
        required: true,
        immutable: true,
    },

    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        immutable: true,
    },

    checkInDate: {
        type: Date,
        default: () => new Date(), // Просто хз как из postman-a ставить
        required: true,
    },
    checkOutDate: {
        type: Date,
        default: () => new Date(), // Просто хз как из postman-a ставить
        required: true,
    },

    // Bill
    price: {
        type: Number, // or String?
        required: true,
    },
    discount: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    bill: { // Счет выставленный нам и оплачиваемый Concierge
        type: Schema.Types.ObjectId,
        ref: 'File',
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    file: { // Подтверждающий документ, не знаю
        type: Schema.Types.ObjectId,
        ref: 'File'
    },
    createdDate: {
        type: Date,
        immutable: true,
        default: () => new Date(),
    },
    updatedDate: {
        type: Date,
        default: () => new Date(),
    }
});


BookingSchema.plugin(require('mongoose-unique-validator'));
BookingSchema.plugin(require('../../log-plugin'));


BookingSchema.statics.privateFiles = function(){
    return [];
}


/*BookingSchema.methods.onCreate = async function({req, res, body, user}){
    const Hotel_Services = require('../../modelsManager').models.Hotel_Service;

    if(body.customer)
        this.customer = body.customer;
    else
        this.customer = user.id;


    const booking = new Booking({
        type: 'hotel/booking',
        'hotel/booking': this.id
    });
    this.booking = booking.id;

    if(!body['hotel/service']){
        await this.validate();
    }

    const hotel_service = await Hotel_Services.findById(body['hotel/service']);

    if(!hotel_service){
        return res.status(400).json({error: "Hotel/Service not found"});
    }

    booking.service = hotel_service.service;

    // Creating booking
    await booking.save();


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


module.exports = model('Hotel/Booking', BookingSchema);
