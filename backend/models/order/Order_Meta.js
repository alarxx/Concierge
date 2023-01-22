/**
 * Запрос клиента
 * */

const {Schema, model} = require('mongoose');

const modelName = 'Order/Meta';
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

    type: {
        type: String,
        enum: ['business_trip', 'event', 'informal'],
        default: 'informal',
    },

    needs: [{
        type: String,
        enum: ['housing', 'transport', 'travel', 'informal'],
        required: true,
    }],

    num_of_people: {
        type: Number,
        default: 1,
    },
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
        enum: ['airplane', 'train', null]
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
        enum: ['hotel', 'apartment', null],
    },
    separateApartments: {
        type: Boolean,
    },

    transport: {
        type: String,
        enum: ['car', 'limousine', null]
    },
    driverNeeded: {
        type: Boolean,
    },

    description: String,

    preferred_services:[{
        type: Schema.Types.ObjectId,
        ref: 'Service'
    }],
});

MetaSchema.plugin(require('mongoose-unique-validator'));
MetaSchema.plugin(require('../logPlugin'))

MetaSchema.methods.onCreate = async function({}){
}

MetaSchema.methods.deepDelete = async function(){
    await handlers.deleteModels(this, []);

    await handlers.deleteArraysOfModels(this, ['preferred_services']);

    await this.delete();

    return this;
}


module.exports = model(modelName, MetaSchema);