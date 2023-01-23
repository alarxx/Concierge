const {Schema, model} = require('mongoose');

const Company = require('../../company/Company');

const FlightSchema = new Schema({
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
    name: {
        type: String,
        required: true,
    },
    placeOfArrival: {
        type: String, // Schema.Types.ObjectId or Number?
    },
    placeOfDeparture: {
        type: String,
    },
});

FlightSchema.plugin(require('mongoose-unique-validator'));

module.exports = model('Flight', FlightSchema);
