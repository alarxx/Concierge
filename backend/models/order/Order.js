/**
 * Набор предложений от Concierge
 * */

const {Schema, model} = require('mongoose');

const User = require('../User');
const Service_Booking = require('../services/Service_Booking');
const Bill = require('../payment/Bill');

const OrderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        immutable: true,
        required: true,
    },
    bookings:[{
        type: Schema.Types.ObjectId,
        ref: 'Service_Booking'
    }],
    bill: { // Счет от Concierge, который оплачивает клиент
        type: Schema.Types.ObjectId,
        ref: 'Bill'
    },
});

OrderSchema.plugin(require('mongoose-unique-validator'));

module.exports = model('Order', OrderSchema);