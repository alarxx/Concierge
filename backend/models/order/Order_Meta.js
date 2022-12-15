/**
 * Запрос клиента
 * */

const {Schema, model} = require('mongoose');

const Order = require('./Order');
const Service = require('../services/Service');

const MetaSchema = new Schema({
    description: String,
    flow_passed: Boolean,
    numOfPeople: Number,
    preferred_services:[{
        type: Schema.Types.ObjectId,
        ref: 'Service'
    }],
});

MetaSchema.plugin(require('mongoose-unique-validator'));

module.exports = model('Order_Meta', MetaSchema);