/**
 * Обертка над всеми офисами компании
 * */

const {Schema, model} = require('mongoose');

const OfficeSchema = new Schema({
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
        immutable: true
    },
    type: {
        type: String,
        enum: ['hotel', 'flight'],
        immutable: true,
        required: true
    },
    'hotel': {
        type: Schema.Types.ObjectId,
        immutable: true,
        ref: 'Hotel',
    },
    'flight': {
        type: Schema.Types.ObjectId,
        immutable: true,
        ref: 'Flight',
    },
});

OfficeSchema.plugin(require('mongoose-unique-validator'));
OfficeSchema.plugin(require('../logPlugin'));

OfficeSchema.methods.deepDelete = async function(){
    await this.delete();
    return this;
}

module.exports = model('Office', OfficeSchema);