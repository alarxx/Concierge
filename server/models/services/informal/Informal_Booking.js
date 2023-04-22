const {Schema, model} = require('mongoose');


const BookingSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        immutable: true,
        required: true
    },
    informal: {
        type: Schema.Types.ObjectId,
        ref: 'Informal',
        immutable: true,
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
BookingSchema.plugin(require('../../log-plugin'));


module.exports = model('Informal/Booking', BookingSchema);