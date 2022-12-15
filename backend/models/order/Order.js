const {Schema, model} = require('mongoose');

const User = require('../User');
const Order_Meta = require('./Order_Meta');
const Booking = require('../services/Booking');
const Bill = require('../payment/Bill');

const OrderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        immutable: true,
        required: true
    },
    meta: {
        type: Schema.Types.ObjectId,
        ref: 'Order_Meta',
        immutable: true,
        required: true
    },
    bookings: [{
        type: Schema.Types.ObjectId,
        ref: 'Booking',
        immutable: true,
        required: true
    }],
    bill: { // Счет от Concierge, который оплачивает клиент
        type: Schema.Types.ObjectId,
        ref: 'Bill'
    },
});

OrderSchema.plugin(require('mongoose-unique-validator'));

module.exports = model('Order', OrderSchema);