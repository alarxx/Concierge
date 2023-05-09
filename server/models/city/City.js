const {Schema, model} = require('mongoose');

const CitySchema = new Schema(
    {
        name: {
            type: String, // `State, City`
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
