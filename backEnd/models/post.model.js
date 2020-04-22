const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  userName: { type: String, required: true },
  email: {type : String, required: true},
  title: { type: String, required: true},
  description: { type: String, required: true },
  location: { type: String, required: true },
  lat: { type: String, required: true },
  lon: { type: String, required: true },
  image: {type: String, required: true},
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;