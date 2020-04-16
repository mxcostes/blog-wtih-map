const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  title: { type: String, required: true},
  image: {type: String, required: true},
  imageId: { type: String, required: true },
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
  