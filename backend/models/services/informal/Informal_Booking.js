const {Schema, model} = require('mongoose');

const Booking = require('../Booking');

const BookingSchema = new Schema({
    booking: {
        type: Schema.Types.ObjectId,
        ref: 'Booking',
    },
});

BookingSchema.plugin(require('mongoose-unique-validator'));

module.exports = model('Informal_Booking', BookingSchema);