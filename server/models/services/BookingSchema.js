const {Schema} = require("mongoose");

const BookingSchema = new Schema({
    type: {
        type: String,
        enum: ['hotel/booking', 'flight/booking', 'informal/booking'],
        immutable: true,
        required: true
    },
    'hotel/booking': {
        type: Schema.Types.ObjectId,
        ref: 'Hotel/Booking',
        immutable: true,
    },
    'flight/booking': {
        type: Schema.Types.ObjectId,
        ref: 'Flight/Booking',
        immutable: true,
    },
    'informal/booking': {
        type: Schema.Types.ObjectId,
        ref: 'Informal/Booking',
        immutable: true,
    }
});

module.exports = BookingSchema;