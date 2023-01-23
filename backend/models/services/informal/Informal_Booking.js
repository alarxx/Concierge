const {Schema, model} = require('mongoose');

const User = require('../../user/User');
const Informal = require('./Informal');
const Bill = require('../../../public/arch/payment/Bill');
const File = require('../../binaries/File');
const BookingModel = require('../Booking');

const modelName = 'Informal/Booking';

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
BookingSchema.plugin(require('../../logPlugin'));

module.exports = model(modelName, BookingSchema);