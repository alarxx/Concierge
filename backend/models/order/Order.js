/**
 * OrderArch при get запросе будет populate-ить meta и не надо будет делать 2 запроса,
 * но если нужно отредачить meta, то мы отправляемся на api/order/meta
 * */

const {Schema, model} = require('mongoose');

const User = require('../User');
const Order_Meta = require('./Order_Meta');
const Booking = require('../services/Booking');
// const Bill = require('../../public/arch/payment/Bill');
const File = require("../binaries/File");

const Conversation = require('../chat/Conversation');
const Participant = require('../chat/Participant');

const OrderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        immutable: true,
        required: true
    },
    conversation: {
        type: Schema.Types.ObjectId,
        ref: 'Conversation',
        immutable: true,
        required: true,
        unique: true,
    },
    meta: {
        type: Schema.Types.ObjectId,
        ref: 'Order/Meta',
        required: true,
        immutable: true,
        // unique: true,
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
    startTime: {
        type: Date,
        immutable: true,
        default: new Date()
    }
});

OrderSchema.plugin(require('mongoose-unique-validator'));
OrderSchema.plugin(require('../logPlugin'))

const handlers = require("../handlers");
const colors = require("../../logging/colors");

OrderSchema.statics.nestedObjectKeys = function(){
    return ['meta']
}

OrderSchema.methods.firstFilling = async function({user}){
    // Creating meta
    const meta = await new Order_Meta({order: this.id});
    this.meta = meta.id;
    await meta.save();

    // Мы наверное должны здесь еще создавать Conversation, Participant и прикреплять везде user-a
    const conversation = await new Conversation({});
    this.conversation = conversation.id;
    await conversation.save();

    const participant = await new Participant({user: user.id, conversation: conversation.id}).save();

    this.customer = user.id;
}

OrderSchema.methods.deepDelete = async function (){
    // if(this.logo) await File.deepDeleteById(this.logo);
    await handlers.deleteModels(this, ['bill', 'meta', 'conversation']);

    // await Promise.all(this.images.map(async id => await File.deepDeleteById(id)));
    await handlers.deleteArraysOfModels(this, ['bookings']);

    await this.delete();

    return this;
}


module.exports = model('Order', OrderSchema);