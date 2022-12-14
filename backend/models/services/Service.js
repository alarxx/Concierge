/**
 * Обертка над всеми услугами
 * */

const {Schema, model} = require('mongoose');

// const Hotel_Class = require('');
// const Flight_Class = require('');

const ServiceSchema = new Schema({
    field: {
        type: String,
        enum: ['hotel_class', 'flight_class', 'informal'],
        immutable: true,
        required: true
    },
    hotel_class: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel_Class'
    },
    flight_class: {
        type: Schema.Types.ObjectId,
        ref: 'Flight_Class'
    },
    informal: {
        type: Schema.Types.ObjectId,
        ref: 'Informal'
    },
});

ServiceSchema.plugin(require('mongoose-unique-validator'));

module.exports = model('Service', ServiceSchema);