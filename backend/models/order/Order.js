const {Schema, model} = require('mongoose');

const User = require('../User');
const Order_Meta = require('./Order_Meta');
const Booking = require('../services/Booking');
const Bill = require('../payment/Bill');
const File = require("../binaries/File");

const OrderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        immutable: true,
        required: true
    },
    bookings: [{
        type: Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    }],
    // bill: { // Счет от Concierge, который оплачивает клиент
    //     type: Schema.Types.ObjectId,
    //     ref: 'Bill'
    // },
    discount: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    bill: { // Счет от Concierge, который оплачивает клиент
        type: Schema.Types.ObjectId,
        ref: 'File'
    },
});

OrderSchema.plugin(require('mongoose-unique-validator'));

OrderSchema.methods.setFields = function(data){
    if(data){
        if(data.customer) this.customer = data.customer;
        if(data.meta) this.meta = data.meta;
        if(data.discount) this.discount = data.discount;
        if(data.bill) this.bill = data.bill;
    }
    return this;
}

OrderSchema.methods.deepDelete = async function(){
    if(this.bill){
        await this.populate('bill');
        await this.bill.delete();
    }

    const meta = await Order_Meta.findOne({order: this.id});
    await meta.deepDelete();

    await this.populate('bookings');
    await Promise.all(this.bookings.map(async booking => await booking.deepDelete()));

    await this.delete();

    return this;
}

module.exports = model('Order', OrderSchema);