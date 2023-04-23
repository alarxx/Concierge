const {Schema, model} = require('mongoose');

const colors = require("../../log/colors");

const MailSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
            immutable: true
        },
        updatedAt: {
            type: Date,
            default: ()=>Date.now()
        }
    },
    {
        strict: true,
    }
)

MailSchema.plugin(require('mongoose-unique-validator'));
MailSchema.plugin(require('../log-plugin'));

module.exports = model('Mailer', MailSchema);
