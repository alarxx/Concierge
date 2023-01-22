const {Schema, model} = require('mongoose');

const modelName = 'Hotel/Booking';

const User = require('../../User');
const Bill = require('../../../public/arch/payment/Bill');
const File = require('../../binaries/File');
const Booking = require('../Booking');

const BookingSchema = new Schema({
    booking:{
        type: Schema.Types.ObjectId,
        ref: 'Booking',
        required: true,
        immutable: true,
        unique: true,
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        immutable: true,
    },
    'hotel/service': {
        type: Schema.Types.ObjectId,
        ref: 'Hotel/Service',
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
});

BookingSchema.plugin(require('mongoose-unique-validator'));
BookingSchema.plugin(require('../../logPlugin'));
BookingSchema.plugin(require('../../../websocket/observer')(modelName));

BookingSchema.statics.publicFiles = function(){
    return [];
}

// const log = require("../../../logging/log");
// const colors = require("../../../logging/colors");

BookingSchema.methods.onCreate = async function({req, res, body, user}){
    /*### Автоматическое установление цены booking-а такой же, как и у service. Не уверен, что это хорошое решение ### */
    /*if(!body['hotel/service']) {
        const err = 'Path `hotel/service` is required.';
        log(colors.red(err));
        return res.status(400).json({error: err});
    }
    const hotel_service = await require('./Hotel_Service').findOne({'hotel/service': body['hotel/service']})
    if(!hotel_service){
        const err = 'Provided `hotel/service` not found ';
        log(colors.red(err));
        return res.status(400).json({error: err});
    }
    this.price = hotel_service.price;*/
    /*######*/

    // Creating booking
    const booking = await new Booking({
        type: 'hotel/booking',
        'hotel/booking': this.id
    }).save();
    this.booking = booking.id;

    this.customer = user.id;
}

const handlers = require("../../handlers");

BookingSchema.methods.deepDelete = async function(){
    // Должны удалить Bill, File
    await handlers.deleteModels(this, ['bill', 'file', 'booking']);

    await handlers.deleteArraysOfModels(this, []);
    await this.delete();

    return this;
}

BookingSchema.virtual('current_price').get(function(){
    return this.price - this.price * (this.discount / 100)
});


module.exports = model(modelName, BookingSchema);
