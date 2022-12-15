const {Schema, model} = require('mongoose');

// const Booking = require('../BookingAbstract');

const BookingSchema = new Schema({
    // booking: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Booking',
    // },
    dateOfArrival:{
        type: Date,
    },
    dateOfDeparture:{
        type: Date,
    },
});

BookingSchema.plugin(require('mongoose-unique-validator'));

module.exports = model('Flight_Booking', BookingSchema);
