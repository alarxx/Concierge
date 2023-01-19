const {Schema, model} = require('mongoose');

const Hotel = require('./Hotel');
const File = require('../../binaries/File');
const Service = require('../Service');

const ClassSchema = new Schema({
    service: { // primary key
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

ClassSchema.plugin(require('mongoose-unique-validator'));
ClassSchema.plugin(require('../../logPlugin'))


const handlers = require('../../handlers');

ClassSchema.methods.firstFilling = async function({body, user}){
    // Creating service
    const service = await new Service({
        type: 'hotel/class',
        'hotel/class': this.id
    }).save();
    this.service = service.id;

    return this;
}

ClassSchema.methods.deepDelete = async function(){
    //Должен удалять все services, прикрепленные к нему и все букинги

    await handlers.deleteModels(this, ['logo', 'service']);

    await handlers.deleteArraysOfModels(this, ['images']);

    await this.delete();

    return this;
}


module.exports = model('Hotel/Class', ClassSchema);
