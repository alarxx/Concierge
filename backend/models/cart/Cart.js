/**
 * Набор предложений Concierge, выбранных пользователем
 * */

const {Schema, model} = require('mongoose');

const User = require('../User');
const Service = require('../services/Service');

const CartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        immutable: true,
        required: true
    },
    service:{
        type: Schema.Types.ObjectId,
        ref: 'Service'
    },
});

CartSchema.plugin(require('mongoose-unique-validator'));

module.exports = model('Cart', CartSchema);