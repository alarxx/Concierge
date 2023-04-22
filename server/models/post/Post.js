const {Schema, model} = require('mongoose');
const colors = require("../../log/colors");

const PostSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            immutable: true,
        },
        body: {
            type: String,
        },
        file: {
            type: Schema.Types.ObjectId,
            ref: 'File'
        },
        private_file: {
            type: Schema.Types.ObjectId,
            ref: 'File'
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },

        accessType: {
            type: String,
            enum: ['public', 'private'],
            default: 'public',
        },
        accessHolders: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    {
        timestamps: true,
        strict: true,
    }
)

PostSchema.index({ createdAt: -1 }); // сначала новые

PostSchema.plugin(require('../log-plugin'));

PostSchema.statics.privateFiles = function(){
    return ['private_file'];
}

module.exports = model('Post', PostSchema);
