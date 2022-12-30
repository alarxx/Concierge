/**
 * Order при get запросе будет populate-ить meta и не надо будет делать 2 запроса,
 * но если нужно отредачить meta, то мы отправляемся на api/order/meta
 * */

const {Schema, model} = require('mongoose');

const User = require('../User');
const Order_Meta = require('./Order_Meta');
const Booking = require('../services/Booking');
// const Bill = require('../../public/arch/payment/Bill');
const File = require("../binaries/File");

const OrderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        immutable: true,
        required: true
    },
    meta: {
        type: Schema.Types.ObjectId,
        ref: 'Order/Meta',
        required: true,
        immutable: true,
        unique: true,
    },
    bookings: [{
        type: Schema.Types.ObjectId,
        ref: 'Booking',
    }],
    // bill: { // Счет от Concierge, который оплачивает клиент
    //     type: Schema.Types.ObjectId,
    //     ref: 'Bill'
    // },
    price: {
        type: Number
    },
    discount: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    bill: { // Счет от Concierge, который оплачивает клиент
        type: Schema.Types.ObjectId,
        ref: 'File',
    },
});

OrderSchema.plugin(require('mongoose-unique-validator'));


const handlers = require("../handlers");


OrderSchema.methods.firstFilling = async function({body, user}){
    // Creating meta
    const meta = await new Order_Meta({order: this.id}).save();
    this.meta = meta.id;

    this.customer = user.id;

    return this;
}


OrderSchema.methods.deepDelete = async function (){
    // if(this.logo) await File.deepDeleteById(this.logo);
    await handlers.deleteModels(this, ['bill', 'meta']);

    // await Promise.all(this.images.map(async id => await File.deepDeleteById(id)));
    await handlers.deleteArraysOfModels(this, ['bookings']);

    await this.delete();

    return this;
}


module.exports = model('Order', OrderSchema);