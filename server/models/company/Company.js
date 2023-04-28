const {Schema, model} = require('mongoose');


const CompanySchema = new Schema(
    {
        name: {
            // нужен уникальный идентификатор компании, пока пусть будет имя просто
            type: String,
            trim: true,
            unique: true,
            required: true,
        },
        description: String,
        logo: {
            type: Schema.Types.ObjectId,
            ref: 'File'
        },
        contract: {
          type: Schema.Types.ObjectId,
          ref: 'File'
        },
        images: [{
            type: Schema.Types.ObjectId,
            ref: 'File'
        }],
    },
    {
        timestamps: true,
        strict: true,
    }
);

CompanySchema.index({ createdAt: -1 });

CompanySchema.plugin(require('mongoose-unique-validator'));
CompanySchema.plugin(require('../log-plugin'));
// CompanySchema.plugin(require('../../websocket/observer/company-observer'));

CompanySchema.statics.privateFiles = function(){
    return ['contract'];
}

module.exports = model('Company', CompanySchema);
