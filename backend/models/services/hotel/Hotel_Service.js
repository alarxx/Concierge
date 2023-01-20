const {Schema, model} = require('mongoose');

const Hotel = require('./Hotel');
const File = require('../../binaries/File');
const Service = require('../Service');

const ServiceSchema = new Schema({
    service: { // foreign/primary key как-будто
        type: Schema.Types.ObjectId,
        ref: 'Service',
        required: true,
        immutable: true,
        unique: true,
    },
    hotel: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true,
        immutable: true,
    },
    class: { // рандомная строка (A1, B1, VIP)
        type: String,
        required: true,
    },
    price: {
        type: Number, // or String?
        required: true,
    },
    discount: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    description: String,
    isActive: Boolean, // Например, поменяли цену, мы можем заменить напрямую цену?

    logo: {
        type: Schema.Types.ObjectId,
        ref: 'File'
    },
    images: [{ //?
        type: Schema.Types.ObjectId,
        ref: 'File'
    }],
});

ServiceSchema.plugin(require('mongoose-unique-validator'));
ServiceSchema.plugin(require('../../logPlugin'))

ServiceSchema.statics.publicFiles = function(){
    return ['logo'];
}

const Hotel_Booking = require('./Hotel_Booking');
const handlers = require('../../handlers');
const colors = require("../../../logging/colors");

ServiceSchema.methods.onCreate = async function({body, user}){
    // Creating service
    const service = await new Service({
        type: 'hotel/service',
        'hotel/service': this.id
    }).save();
    this.service = service.id;
}

ServiceSchema.methods.deepDelete = async function(){
    //Должен удалить service, прикрепленный к нему, и все букинги, которые отсылаются на него
    const bookings = await Hotel_Booking.find({'hotel/service': this.id});
    console.log(colors.red('bookings[]='), bookings);
    await Promise.all(bookings.map(async booking => booking.deepDelete()));

    await handlers.deleteModels(this, ['logo', 'service']);

    await handlers.deleteArraysOfModels(this, ['images']);

    await this.delete();

    return this;
}


module.exports = model('Hotel/Service', ServiceSchema);
