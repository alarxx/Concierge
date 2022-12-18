/**
 * Запрос клиента
 * */

const {Schema, model} = require('mongoose');

const Order = require('./Order');
const Service = require('../services/Service');

const MetaSchema = new Schema({
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        immutable: true,
        required: true,
        unique: true,
    },
    description: String,
    flow_passed: Boolean,
    numOfPeople: Number,
    preferred_services:[{
        type: Schema.Types.ObjectId,
        ref: 'Service'
    }],
});

MetaSchema.plugin(require('mongoose-unique-validator'));

MetaSchema.methods.setFields = function(data){
    if(data){
        if(data.description) this.description = data.description;
        if(data.flow_passed) this.flow_passed = data.flow_passed;
        if(data.numOfPeople) this.numOfPeople = data.numOfPeople;
        if(data.description) this.description = data.description;
    }
    return this;
}

MetaSchema.methods.deepDelete = async function(){
    await this.populate('preferred_services');
    await Promise.all(this.preferred_services.map(async service => await service.deepDelete()));

    await this.delete();

    return this;
}

module.exports = model('Order_Meta', MetaSchema);