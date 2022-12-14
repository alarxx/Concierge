const {Schema, model} = require('mongoose');

const User = require('../User');
const Service = require('./Service');
const Bill = require('../payment/Bill');
const File = require('../binaries/File');

const BookingSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        immutable: true,
        required: true
    },
    service: {
        type: Schema.Types.ObjectId,
        ref: 'Service'
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

module.exports = model('Booking', BookingSchema);