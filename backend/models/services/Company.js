const {Schema, model} = require('mongoose');

const CompanySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

CompanySchema.plugin(require('mongoose-unique-validator'));

module.exports = model('Company', CompanySchema);
