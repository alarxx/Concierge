/**
 * Запрос клиента
 * */

const {Schema, model} = require('mongoose');

const modelName = 'Order/Meta';

const MetaSchema = new Schema({

    name: {
        type: String,
        required: true,
        default: ()=>`Order ${Date.now()}`
    },

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
    separate_apartments: {
        type: Boolean,
    },

    transport: {
        type: String,
        enum: ['car', 'limousine']
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
MetaSchema.plugin(require('../log-plugin'))

module.exports = model(modelName, MetaSchema);