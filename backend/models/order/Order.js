/**
 * У нас нет CRUD-а на Order_Meta, всю работу с моделью берет на себя order.
 *
 * Как работать с массивом bookings?
 * Просто PUT-им туда массив (именно id-шек Booking-а), без заморочек.
 * У нас же нет /api/booking, можно без него как-нибудь решить вопрос, как потом получить hotel/booking
 * Похоже что мне придется написать /api/booking, который будет массивы раскрывать и специфичные находить
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

/**
 * Что означает nestedObjectKeys?
 * По умолчанию мы не можем set-ить глубокий объект в модель, обычно это просто id,
 * а если мы добавим ключ, то это поле будет populate-титься и set-ить объект
 * */
OrderSchema.statics.nestedObjectKeys = function(){
    return ['meta']
}

OrderSchema.methods.onCreate = async function({user}){
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