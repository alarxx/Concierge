/**
 * У нас нет CRUD-а на Order_Meta, всю работу с моделью берет на себя order.
 *
 * Как работать с массивом bookings?
 * Просто PUT-им туда массив (именно id-шек Booking-а), без заморочек.
 * У нас же нет /api/booking, можно без него как-нибудь решить вопрос, как потом получить hotel/booking
 * Похоже что мне придется написать /api/booking, который будет массивы раскрывать и специфичные находить
 * */

const {Schema, model} = require('mongoose');

const BookingSchema = require('../services/BookingSchema');

const MetaSchema = new Schema({
    /*name: {
        type: String,
        // required: true,
        default: () => `Order ${Date.now()}`
    },*/

    // type: {
    //     type: String,
    //     enum: ['business_trip', 'event', 'informal'],
    //     default: 'informal',
    // },

    needs: [{
        type: String,
        enum: ['hotel', 'airfare', 'housing', 'transport', 'travel', 'informal'],
        required: true,
    }],

    num_of_people: {
        type: Number,
        default: 1,
    },
    // если в needs входит 'tickets'
    departure_place:{
        type: String,
    },
    destination_place: {
        type: String,
    },

    // если в needs входит 'tickets'
    travel_transport: {
        type: String,
        enum: ['airplane', 'train']
    },
    date_start: {
        type: Date,
    },
    date_end: {
        type: Date,
    },
    one_way_ticket: {
        type: Boolean,
    },

    housing: {
        type: String,
        enum: ['hotel', 'apartment'],
    },
    separate_apartments: {
        type: Boolean,
    },

    transport: {
        type: String,
        enum: ['car', 'limousine']
    },
    driverNeeded: {
        type: Boolean,
    },

    description: String,

});


const OrderSchema = new Schema(
    {
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
            type: MetaSchema,
            required: true,
            // immutable: true,
        },
        bookings: [{
          type: BookingSchema,
        }],
        /*bookings: [{
            type: Schema.Types.ObjectId,
            ref: 'Booking',
        }],*/
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
        bill_file: { // Счет от Concierge, который оплачивает клиент
            type: Schema.Types.ObjectId,
            ref: 'File',
        },
        status: {
            type: String,
            enum: ['new', 'handling', 'canceled', 'completed'],
            default: 'new'
        },

        accessHolders: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    }
    ,
    {
        timestamps: true,
        strict: true,
    }
);

OrderSchema.index({ createdAt: 1 }); // сначала старые

OrderSchema.plugin(require('mongoose-unique-validator'));
OrderSchema.plugin(require('../log-plugin'));
OrderSchema.plugin(require('../../websocket/observer/order-observer'))

/*OrderSchema.methods.deepDelete = async function (){
    // if(this.logo) await File.deepDeleteById(this.logo);
    await handlers.deleteModels(this, ['bill', 'meta', 'conversation']);

    // await Promise.all(this.images.map(async id => await File.deepDeleteById(id)));
    await handlers.deleteArraysOfModels(this, ['bookings']);

    await this.delete();

    return this;
}*/


module.exports = model('Order', OrderSchema);