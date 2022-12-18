const {Schema, model} = require('mongoose');

const User = require('../../User');
const Hotel_Class = require('./Hotel_Class');
const Bill = require('../../payment/Bill');
const File = require('../../binaries/File');
const Booking = require('../Booking');

const BookingSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        immutable: true,
        required: true
    },
    hotel_class: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel_Class',
        immutable: true,
        required: true,
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


BookingSchema.methods.setFields = function(data){
    if(data) {
        if (data.customer) this.customer = data.customer;
        if (data.hotel_class) this.hotel_class = data.hotel_class;
        if (data.checkInDate) this.checkInDate = data.checkInDate;
        if (data.checkOutDate) this.checkOutDate = data.checkOutDate;
        if (data.price) this.price = data.price;
        if (data.discount) this.discount = data.discount;
        if (data.bill) this.bill = data.bill;
        if (data.isPaid) this.isPaid = data.isPaid;
        if (data.file) this.file = data.file;
    }
    return this;
}


BookingSchema.methods.deepDelete = async function(){
    // Должны удалить Bill, File
    await this.delete();
    return this;
}


module.exports = model('Hotel_Booking', BookingSchema);
