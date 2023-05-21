const {Schema, model} = require('mongoose');


const BookingSchema = new Schema(
    {
        order: {
            type: Schema.Types.ObjectId,
            ref: 'Order',
            required: true,
            // immutable: true,
        },
        'hotel/room': {
            type: Schema.Types.ObjectId,
            ref: 'Hotel/Room',
            immutable: true,
        },
        'hotel': {
            type: Schema.Types.ObjectId,
            ref: 'Hotel',
            immutable: true,
        },

        customer: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            immutable: true,
        },

        check_in_date: {
            type: Date,
            required: true,
        },
        check_out_date: {
            type: Date,
            required: true,
        },
        number_of_adults: {
            type: Number,
            default: 1,
        },
        number_of_children: {
            type: Number,
            default: 0,
        },
        // Bill
        price: {
            type: Number, // or String?
            // required: true,
        },
        discount: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },
        bill_file: { // Счет выставленный нам и оплачиваемый Concierge
            type: Schema.Types.ObjectId,
            ref: 'File',
        },
        isPaid: {
            type: Boolean,
            default: false
        },
        file: { // Подтверждающий документ, не знаю
            type: Schema.Types.ObjectId,
            ref: 'File'
        },
        status: {
            type: String,
            enum: ['new', 'handling', 'canceled', 'completed'],
            default: 'new'
        },
    },
    {
        timestamps: true,
        strict: true,
    }
);

// BookingSchema.index({ createdAt: 1 });

BookingSchema.plugin(require('mongoose-unique-validator'));
BookingSchema.plugin(require('../../log-plugin'));
// HotelSchema.plugin(require('../../websocket/observer/hotel-observer'));


BookingSchema.statics.privateFiles = function(){
    return [];
}


module.exports = model('Hotel/Booking', BookingSchema);
