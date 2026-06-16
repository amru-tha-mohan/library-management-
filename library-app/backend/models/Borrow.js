const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema({
  name: String,
  book: String,
  regNo: String,

  dateTime: {
    type: String,
    default: () =>
      new Date()
        .toISOString()
        .split("T")[0]
  },

  dueDate: {
    type: String,
    default: ""
  },

  status: {
    type: String,
    default: "Borrowed"
  }
});

module.exports = mongoose.model(
  "Borrow",
  borrowSchema
);