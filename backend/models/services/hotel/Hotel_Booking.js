const {Schema, model} = require('mongoose');

const Booking = require('../Booking');
const Hotel_Class = require('./Hotel_Class');

const BookingSchema = new Schema({
    booking: {
        type: Schema.Types.ObjectId,
        ref: 'Booking',
    },
    date: Date,
});

BookingSchema.plugin(require('mongoose-unique-validator'));

module.exports = model('Hotel_Booking', BookingSchema);
