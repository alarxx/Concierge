/**
 * Обертка над всеми услугами
 * */

const {Schema, model} = require('mongoose');

// const Hotel_Class = require('');
// const Flight_Class = require('');

const ServiceSchema = new Schema({
    type: {
        type: String,
        enum: ['hotel/class', 'flight/class', 'informal'],
        immutable: true,
        required: true
    },
    'hotel/class': {
        type: Schema.Types.ObjectId,
        immutable: true,
        ref: 'Hotel/Class',
    },
    'flight/class': {
        type: Schema.Types.ObjectId,
        immutable: true,
        ref: 'Flight/Class',
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