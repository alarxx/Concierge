const {Schema, model} = require('mongoose');
const log = require('../log');

const File = require('./binaries/File');

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
CompanySchema.plugin(require('./logPlugin'))

const handlers = require('./handlers');

CompanySchema.methods.firstFilling = async function({body, user}){
    return this;
}

CompanySchema.methods.deepDelete = async function (){
    // if(this.logo) await File.deepDeleteById(this.logo);
    await handlers.deleteModels(this, ['logo']);

    // await Promise.all(this.images.map(async id => await File.deepDeleteById(id)));
    await handlers.deleteArraysOfModels(this, ['images']);

    await this.delete();

    return this;
}

module.exports = model('Company', CompanySchema);
