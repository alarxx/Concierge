/**
 * Обертка над всеми booking-ами услуг.
 * Используется только в OrderArch
 * */

const {Schema, model} = require('mongoose');

// const Hotel_Class = require('');
// const Flight_Class = require('');

const BookingSchema = new Schema({
    type: {
        type: String,
        enum: ['hotel/booking', 'flight/booking', 'informal/booking'],
        immutable: true,
        required: true
    },
    'hotel/booking': {
        type: Schema.Types.ObjectId,
        immutable: true,
        ref: 'Hotel/Booking',
        unique: true,
    },
    'flight/booking': {
        type: Schema.Types.ObjectId,
        immutable: true,
        ref: 'Flight/Booking',
    },
    'informal/booking': {
        type: Schema.Types.ObjectId,
        immutable: true,
        ref: 'Informal/Booking',
    }
});

BookingSchema.plugin(require('mongoose-unique-validator'));
BookingSchema.plugin(require('../logPlugin'));

BookingSchema.methods.deepDelete = async function(){
    await this.delete();
    return this;
}

module.exports = model('Booking', BookingSchema);