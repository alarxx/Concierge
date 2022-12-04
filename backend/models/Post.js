const {Schema, model} = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator'); //for errors

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdDate: {
    type: Date,
    default: new Date()
  }
});

PostSchema.plugin(uniqueValidator);

const Post = model('Post', PostSchema);

module.exports = Post;
