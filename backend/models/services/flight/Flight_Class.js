const {Schema, model} = require('mongoose');

const Flight = require('./Flight');
const Price = require('../../../public/arch/payment/Price');
const File = require('../../binaries/File');

const ClassSchema = new Schema({
    flight: {
        type: Schema.Types.ObjectId,
        ref: 'Flight'
    },
    class: {
        type: String,
        required: true,
    },
    price: {
        type: Schema.Types.ObjectId,
        ref: 'Price'
    },
    description: String,
    images: [{
        type: Schema.Types.ObjectId,
        ref: 'File'
    }],
    isActive: Boolean, // Например, поменяли цену
});

ClassSchema.plugin(require('mongoose-unique-validator'));

module.exports = model('Flight_Class', ClassSchema);
