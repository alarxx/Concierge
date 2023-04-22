const {Schema, model} = require('mongoose');

const modelName = 'Company';

const log = require('../../logging/log');

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
    createdDate: {
        type: Date,
        immutable: true,
        default: () => new Date(),
    },
    updatedDate: {
        type: Date,
        default: () => new Date(),
    }
});


CompanySchema.plugin(require('mongoose-unique-validator'));
CompanySchema.plugin(require('../updatedDate'))
CompanySchema.plugin(require('../logPlugin'))

CompanySchema.statics.publicFiles = function(){
    return ['logo'];
}

const handlers = require('../handlers');

CompanySchema.methods.onCreate = async function({body, user}){
}

CompanySchema.methods.deepDelete = async function (){
    // Должен по идее удалять все что прикреплено к компании, но это overkill кажется, слишком...

    // if(this.logo) await File.deepDeleteById(this.logo);
    await handlers.deleteModels(this, ['logo']);

    // await Promise.all(this.images.map(async id => await File.deepDeleteById(id)));
    await handlers.deleteArraysOfModels(this, ['images']);

    await this.delete();

    return this;
}

module.exports = model(modelName, CompanySchema);
