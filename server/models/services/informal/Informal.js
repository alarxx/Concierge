const {Schema, model} = require('mongoose');

const log = require('../../../logging/log')
const colors = require("../../../logging/colors");

const modelName = 'Informal';

const InformalSchema = new Schema({
    description: String,
});

InformalSchema.plugin(require('mongoose-unique-validator'));
InformalSchema.plugin(require('../../logPlugin'));

module.exports = model(modelName, InformalSchema);