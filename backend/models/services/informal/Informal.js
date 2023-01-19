const {Schema, model} = require('mongoose');
const log = require('../../../log')
const colors = require("../../../colors");

const InformalSchema = new Schema({
    description: String,
});

InformalSchema.plugin(require('mongoose-unique-validator'));

InformalSchema.post('save', function(document, next){
    log(colors.green('saved:'), {Informal: document});
    next();
});
InformalSchema.post('remove', function(document, next){
    log(colors.green('removed:'), {Informal: document});
    next();
});

module.exports = model('Informal', InformalSchema);