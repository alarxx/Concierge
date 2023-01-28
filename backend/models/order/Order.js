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

    status: {
        type: String,
        enum: ['new', 'handling', 'canceled', 'completed'],
        default: 'new'
    },

    createdDate: {
        type: Date,
        immutable: true,
        default: () => new Date(),
    },
    updatedDate: {
        type: Date,
        default: () => new Date(),
    }
});

OrderSchema.plugin(require('mongoose-unique-validator'));
OrderSchema.plugin(require('../logPlugin'))
OrderSchema.plugin(require('../updatedDate'))
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
    const Orders = require('../modelsManager').models.Order;
    const Order_Metas = require('../modelsManager').models.Order_Meta;
    const Conversations = require('../modelsManager').models.Conversation;
    const Participants = require('../modelsManager').models.Participant;

    // Creating meta
    const meta = new Order_Metas({order: this.id});
    this.meta = meta.id;
    if(body.meta){
        meta.set(body.meta);
    }
    await meta.validate();

// Мы наверное должны здесь еще создавать Conversation, Participant и прикреплять везде user-a
    const conversation = await new Conversations({});
    this.conversation = conversation.id;

    const participant = new Participants({user: user.id, conversation: conversation.id})
    // Нужно автоматически генерировать name, если его не предоставили.
    if(!body.meta?.name){
        const customersOrders = await Orders.find({customer: user.id});
        let name = `Нестандартная услуга ${customersOrders.length + 1}`;
        if(body.meta.type === 'event'){
            name = `Мероприятие ${customersOrders.length + 1}`;
        }
        else if(body.meta.type === 'business_trip'){
            name = `Командировка ${customersOrders.length + 1}`;
        }
        meta.name = name;
        conversation.name = name;
    }else{
        conversation.name = body.meta.name;
    }


    await meta.save();
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