const {Schema, model} = require('mongoose');

const Company = require('../../Company');
const File = require('../../binaries/File');

const HotelSchema = new Schema({
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
        immutable: true,
    },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        // ref: 'Address'
    },
    stars: {
        type: Number,
        min: 1,
        max: 5,
    },
    logo: {
        type: Schema.Types.ObjectId,
        ref: 'File'
    },
    images: [{
        type: Schema.Types.ObjectId,
        ref: 'File'
    }],
});

HotelSchema.plugin(require('mongoose-unique-validator'));

const handlers = require('../../handlers');

HotelSchema.methods.firstFilling = async function({body, user}){
    return this;
}

HotelSchema.methods.deepDelete = async function(){
    // if(this.logo) await File.deepDeleteById(this.logo);
    await handlers.deleteModels(this, ['logo']);

    // await Promise.all(this.images.map(async id => await File.deepDeleteById(id)));
    await handlers.deleteArraysOfModels(this, ['images']);

    await this.delete();
    return this;
}

module.exports = model('Hotel', HotelSchema);