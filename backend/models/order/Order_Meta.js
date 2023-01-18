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

    needs: [{
        type: String,
        enum: ['housing', 'transport', 'travel', 'informal']
    }],

    type: {
      type: String,
      enum: ['business_trip', 'event'],
    },

    num_of_people: Number,
    // если в needs входит 'tickets'
    departure_place:{
        type: String,
    },
    destination_place: {
        type: String,
    },

    // если в needs входит 'tickets'
    travel_transport: {
        type: String,
        enum: ['airplane', 'train']
    },
    date_start: {
      type: Date,
    },
    date_end: {
        type: Date,
    },
    one_way_ticket: {
        type: Boolean,
    },

    housing: {
        type: String,
        enum: ['hotel', 'apartment'],
    },
    separateApartments: {
        type: Boolean,
        default: false,
    },

    transport: {
        type: String,
        enum: ['car', 'limousine']
    },
    driverNeeded: {
        type: Boolean,
        default: false,
    },

    description: String,

    flow_passed: Boolean,
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