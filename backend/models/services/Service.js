/**
 * Обертка над всеми услугами
 * */

const {Schema, model} = require('mongoose');

// const Hotel_Class = require('');
// const Flight_Class = require('');

const ServiceSchema = new Schema({
    type: {
        type: String,
        enum: ['hotel_class', 'flight_class', 'informal'],
        immutable: true,
        required: true
    },
    hotel_class: {
        type: Schema.Types.ObjectId,
        immutable: true,
        ref: 'Hotel_Class'
    },
    flight_class: {
        type: Schema.Types.ObjectId,
        immutable: true,
        ref: 'Flight_Class'
    },
    informal: {
        type: Schema.Types.ObjectId,
        immutable: true,
        ref: 'Informal'
    },
});

ServiceSchema.plugin(require('mongoose-unique-validator'));

ServiceSchema.methods.setFields = function(data){
    if(data){
        if(data.type) this.type = data.type;
        if(data.hotel_class) this.hotel_class = data.hotel_class;
        if(data.flight_class) this.flight_class = data.flight_class;
        if(data.informal) this.type = data.informal;
    }
    return this;
}

ServiceSchema.methods.deepDelete = async function(){
    // А нужно ли удалять?
    // await this.populate(this.type);
    // await this[this.type].deepDelete();
    await this.delete();
    return this;
}

module.exports = model('Service', ServiceSchema);