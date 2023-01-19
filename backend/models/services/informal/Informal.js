const {Schema, model} = require('mongoose');
const log = require('../../../log')
const colors = require("../../../colors");

const InformalSchema = new Schema({
    description: String,
});

InformalSchema.plugin(require('mongoose-unique-validator'));
InformalSchema.plugin(require('../../logPlugin'));

module.exports = model('Informal', InformalSchema);