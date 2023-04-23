const {Schema, model} = require('mongoose');


const InformalSchema = new Schema({
    description: String,
});


InformalSchema.plugin(require('mongoose-unique-validator'));
InformalSchema.plugin(require('../../log-plugin'));


module.exports = model('Informal', InformalSchema);