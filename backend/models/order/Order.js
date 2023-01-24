/**
 * У нас нет CRUD-а на Order_Meta, всю работу с моделью берет на себя order.
 *
 * Как работать с массивом bookings?
 * Просто PUT-им туда массив (именно id-шек Booking-а), без заморочек.
 * У нас же нет /api/booking, можно без него как-нибудь решить вопрос, как потом получить hotel/booking
 * Похоже что мне придется написать /api/booking, который будет массивы раскрывать и специфичные находить
 * */

const {Schema, model} = require('mongoose');

const modelName = 'Order';

const OrderSchema = new Schema({
    name: String,

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
    },
    status: {
        type: String,
        enum: ['new', 'handling', 'completed']
    }
});

OrderSchema.plugin(require('mongoose-unique-validator'));
OrderSchema.plugin(require('../logPlugin'))
OrderSchema.plugin(require('../../websocket/observer/order/order'))

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

OrderSchema.methods.onCreate = async function({body, user}){
    const Order_Meta = require('./Order_Meta');
    const Conversation = require('../chat/Conversation');
    const Participant = require('../chat/Participant');

    // Creating meta
    const meta = await new Order_Meta({order: this.id});
    this.meta = meta.id;
    if(body.meta){
        meta.set(body.meta);
    }
    await meta.save();

    // if(!body.conversation_name) return res.status(400).json({error: 'please provide name for conversation'});

    // Мы наверное должны здесь еще создавать Conversation, Participant и прикреплять везде user-a
    const conversation = await new Conversation({});
    if(body.conversation_name)
        conversation.name = body.conversation_name;

    this.conversation = conversation.id;

    const participant = new Participant({user: user.id, conversation: conversation.id})

    await participant.save();

    await conversation.save();

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


module.exports = model(modelName, OrderSchema);