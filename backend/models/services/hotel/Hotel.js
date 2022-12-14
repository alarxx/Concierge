const {Schema, model} = require('mongoose');

const Company = require('../../Company');

const HotelSchema = new Schema({
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: 'Address'
    },
    stars: {
        type: Number,
        min: 1,
        max: 5,
    }
});

HotelSchema.plugin(require('mongoose-unique-validator'));

module.exports = model('Hotel', HotelSchema);
