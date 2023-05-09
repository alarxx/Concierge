const {Schema, model} = require('mongoose');

const CitySchema = new Schema(
    {
        country: {
            type: String, // `State`
        },
        name: {
            type: String, // `State, City` or `City`
            unique: true,
            required: true,
        },
        description: String,
    },
    {
        timestamps: true,
        strict: true,
    }
);

CitySchema.plugin(require('mongoose-unique-validator'));
CitySchema.plugin(require('../log-plugin'));

module.exports = model('City', CitySchema);
