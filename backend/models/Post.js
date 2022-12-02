const {Schema, model} = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator'); //for errors

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
  }
});

PostSchema.plugin(uniqueValidator);

const Post = model('Post', PostSchema);

module.exports = Post;
