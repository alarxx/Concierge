/**
 * Набор предложений от Concierge
 * */

const {Schema, model} = require('mongoose');

const User = require('../User');
const Service_Booking = require('../services/Service_Booking');
const Bill = require('../payment/Bill');
const FileModel = require("../binaries/File");

const BlockSchema = new Schema({
    bookings:[{
        type: Schema.Types.ObjectId,
        ref: 'Service_Booking'
    }],
    bill: { // Счет от Concierge, который оплачивает клиент
        type: Schema.Types.ObjectId,
        ref: 'Bill'
    },
});

BlockSchema.plugin(require('mongoose-unique-validator'));

module.exports = model('Order_Block', BlockSchema);