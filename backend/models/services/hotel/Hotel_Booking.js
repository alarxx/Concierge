const {Schema, model} = require('mongoose');

const User = require('../../User');
const Hotel_Class = require('./Hotel_Class');
const Bill = require('../../../public/arch/payment/Bill');
const File = require('../../binaries/File');
const Booking = require('../Booking');
const handlers = require("../../handlers");

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
    'hotel/class': {
        type: Schema.Types.ObjectId,
        ref: 'Hotel/Class',
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


BookingSchema.methods.firstFilling = async function({body, user}){
    // Creating booking
    const booking = await new Booking({
        type: 'hotel/booking',
        'hotel/booking': this.id
    }).save();
    this.booking = booking.id;

    this.customer = user.id;

    return this;
}


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


module.exports = model('Hotel/Booking', BookingSchema);
