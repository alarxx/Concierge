const {Schema, model} = require('mongoose');

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
            ref: 'File',
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
        strict: true,
    }
)

PostSchema.plugin(require('../log-plugin'));

PostSchema.statics.privateFiles = function(){
    return ['file'];
}

module.exports = model('Post', PostSchema);
