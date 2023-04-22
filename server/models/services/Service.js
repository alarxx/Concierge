/**
 * Обертка над всеми услугами
 * */

const {Schema, model} = require('mongoose');

// const Hotel_Class = require('');
// const Flight_Class 1 require('');

const ServiceSchema = new Schema({
    office: {
        type: Schema.Types.ObjectId,
        ref: 'Office',
        required: true,
        immutable: true
    },
    type: {
        type: String,
        enum: ['hotel/service', 'flight/service', 'informal'],
        immutable: true,
        required: true
    },
    'hotel/service': {
        type: Schema.Types.ObjectId,
        immutable: true,
        ref: 'Hotel/Service',
    },
    'flight/service': {
        type: Schema.Types.ObjectId,
        immutable: true,
        ref: 'Flight/Service',
    },
    'informal': {
        type: Schema.Types.ObjectId,
        immutable: true,
        ref: 'Informal',
    },
});

ServiceSchema.plugin(require('mongoose-unique-validator'));
ServiceSchema.plugin(require('../logPlugin'));

ServiceSchema.methods.deepDelete = async function(){
    await this.delete();
    return this;
}

module.exports = model('Service', ServiceSchema);