const mongoose = require('mongoose');

//----------CREATE SCHEMA-------------//
const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,

      required: [true, 'Post must belong to a name'],
    },
    description: {
      type: String,
      maxlength: [300, 'Posts can not be more than 300 character long '],
      required: [true, 'Post must not be empty '],
      trim: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

//----------QUERY MIDDLEWARE-------------//

//----------CREATE POSTS MODEL-------------//
const Post = mongoose.model('Post', postSchema);
module.exports = Post;
