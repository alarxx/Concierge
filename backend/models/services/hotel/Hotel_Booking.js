const {Schema, model} = require('mongoose');

const Hotel_Class = require('./Hotel_Class');

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
    date: {
        type: Date,
        required: true,
    },
    bill: { // Счет выставленный нам и оплачиваемый Concierge
        type: Schema.Types.ObjectId,
        ref: 'Bill'
    },
    file: {
        type: Schema.Types.ObjectId,
        ref: 'File'
    },
});

BookingSchema.plugin(require('mongoose-unique-validator'));

module.exports = model('Hotel_Booking', BookingSchema);
