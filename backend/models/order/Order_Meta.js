/**
 * Запрос клиента
 * */

const {Schema, model} = require('mongoose');

const Order = require('./Order');
const Service = require('../services/Service');
const handlers = require("../handlers");

const MetaSchema = new Schema({
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        immutable: true,
        required: true,
        unique: true,
    },
    description: String,
    flow_passed: Boolean,
    numOfPeople: Number,
    preferred_services:[{
        type: Schema.Types.ObjectId,
        ref: 'Service'
    }],
});

MetaSchema.plugin(require('mongoose-unique-validator'));


MetaSchema.methods.deepDelete = async function(){
    await handlers.deleteModels(this, []);

    await handlers.deleteArraysOfModels(this, ['preferred_services']);

    await this.delete();

    return this;
}


module.exports = model('Order/Meta', MetaSchema);