const {Schema, model} = require('mongoose');


const CompanySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    logo: {
        type: Schema.Types.ObjectId,
        ref: 'File'
    },
    images: [{
        type: Schema.Types.ObjectId,
        ref: 'File'
    }],
});


CompanySchema.plugin(require('mongoose-unique-validator'));
CompanySchema.plugin(require('../log-plugin'));
// CompanySchema.plugin(require('../../websocket/observer/company-observer'));

CompanySchema.statics.privateFiles = function(){
    return [];
}

module.exports = model('Company', CompanySchema);
