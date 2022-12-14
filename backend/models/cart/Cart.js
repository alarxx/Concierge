/**
 * Набор предложений от Concierge
 * */

const {Schema, model} = require('mongoose');

const User = require('../User');
const Service = require('../services/Service');

const CartSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        immutable: true,
        required: true
    },
    services:[{
        type: Schema.Types.ObjectId,
        ref: 'Service'
    }],
});

CartSchema.plugin(require('mongoose-unique-validator'));

module.exports = model('Cart', CartSchema);