const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  image: String,

  description: String,

  rating: {
    type: Number,
    default: 4.5
  },

  available: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("Book", bookSchema);