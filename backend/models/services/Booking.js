/**
 * Обертка над всеми booking-ами услуг.
 * Используется только в Order
 * */

const {Schema, model} = require('mongoose');

// const Hotel_Class = require('');
// const Flight_Class = require('');

const BookingSchema = new Schema({
    type: {
        type: String,
        enum: ['hotel_booking', 'flight_booking', 'informal_booking'],
        immutable: true,
        required: true
    },
    hotel_booking: {
        type: Schema.Types.ObjectId,
        immutable: true,
        ref: 'Hotel_Booking'
    },
    flight_booking: {
        type: Schema.Types.ObjectId,
        immutable: true,
        ref: 'Flight_Booking'
    },
    informal_booking: {
        type: Schema.Types.ObjectId,
        immutable: true,
        ref: 'Informal_Booking'
    }
});

BookingSchema.plugin(require('mongoose-unique-validator'));

BookingSchema.methods.setFields = function(data){
    if(data){
        if (data.type) this.type = data.type;
        if (data.hotel_booking) this.hotel_booking = data.hotel_booking;
        if (data.flight_booking) this.flight_booking = data.flight_booking;
        if (data.informal_booking) this.informal_booking = data.informal_booking;
    }
    return this;
}

BookingSchema.methods.deepDelete = async function(){
    await this.populate(this.type);
    await this[this.type].deepDelete();
    await this.delete();
    return this;
}

module.exports = model('Booking', BookingSchema);