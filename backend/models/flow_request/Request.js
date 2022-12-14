/**
 * Набор предложений от Concierge
 * */

const {Schema, model} = require('mongoose');

const User = require('../User');
const Service = require('../services/Service');
const Order = require('../order/Order');

const RequestSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        immutable: true,
        required: true
    },
    preferred_services:[{
        type: Schema.Types.ObjectId,
        ref: 'Service'
    }],
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    },
});

RequestSchema.plugin(require('mongoose-unique-validator'));

module.exports = model('Request', RequestSchema);