const {Schema, model} = require('mongoose');

const InformalSchema = new Schema({
    description: String,
});

InformalSchema.plugin(require('mongoose-unique-validator'));

InformalSchema.post('save', function(document, next){
    if(process.env.REST_LOG === 'needed')
        console.log('save:', {Informal: document});
    next();
});

module.exports = model('Informal', InformalSchema);