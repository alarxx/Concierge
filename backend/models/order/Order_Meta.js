const {Schema, model} = require('mongoose');

const Service = require('../services/Service');

const MetaSchema = new Schema({
    flow_passed: Boolean,
    preferred_services:[{
        type: Schema.Types.ObjectId,
        ref: 'Service'
    }],
});

MetaSchema.plugin(require('mongoose-unique-validator'));

module.exports = model('Meta', MetaSchema);