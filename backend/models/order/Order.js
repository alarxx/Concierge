/**
 * Набор предложений от Concierge
 * */

const {Schema, model} = require('mongoose');

const User = require('../User');
const Order = require('../order/Order_Block');
const Service = require('../services/Service');
const Order_Block = require('./Order_Block');
const Order_Meta = require('./Order_Meta');

const OrderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        immutable: true,
        required: true
    },
    meta:{
        type: Schema.Types.ObjectId,
        ref: 'Order_Meta'
    },
    block: {
        type: Schema.Types.ObjectId,
        ref: 'Order_Block'
    },
});

OrderSchema.plugin(require('mongoose-unique-validator'));

module.exports = model('Order', OrderSchema);