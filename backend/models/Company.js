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

CompanySchema.methods.setFields = function(data){
    if(data) {
        if (data.name) this.name = data.name;
        if (data.description) this.description = data.description;
        // if(data.images) this.images = data.images; // опасно по идее
    }
    return this;
}

module.exports = model('Company', CompanySchema);
