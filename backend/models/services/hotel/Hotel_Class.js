const {Schema, model} = require('mongoose');

const Hotel = require('./Hotel');
const Price = require('../../payment/Price');
const File = require('../../binaries/File');

const ClassSchema = new Schema({
    hotel: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel'
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
    }]
});

ClassSchema.plugin(require('mongoose-unique-validator'));

module.exports = model('Hotel_Class', ClassSchema);
