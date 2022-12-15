const {Schema, model} = require('mongoose');

const CompanySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    images: [{
        type: Schema.Types.ObjectId,
        ref: 'File'
    }],
});

CompanySchema.plugin(require('mongoose-unique-validator'));

module.exports = model('Company', CompanySchema);
