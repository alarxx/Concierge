/**
 * Обертка над всеми booking-ами услуг
 * */

const {Schema, model} = require('mongoose');

// const Hotel_Class = require('');
// const Flight_Class = require('');

const BookingSchema = new Schema({
    field: {
        type: String,
        enum: ['hotel_booking', 'flight_booking', 'informal_booking'],
        immutable: true,
        required: true
    },
    hotel_booking: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel_Booking'
    },
    flight_booking: {
        type: Schema.Types.ObjectId,
        ref: 'Flight_Booking'
    },
    informal_booking: {
        type: Schema.Types.ObjectId,
        ref: 'Informal_Booking'
    }
});

BookingSchema.plugin(require('mongoose-unique-validator'));

module.exports = model('Service_Booking', BookingSchema);