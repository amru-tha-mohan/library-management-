const mongoose = require("mongoose");

const returnSchema = new mongoose.Schema({
  name: String,
  regNo: String,
  book: String,
  issueDate: String,
  dueDate: String,
  returnDate: String,
  fine: Number
});

module.exports = mongoose.model(
  "Return",
  returnSchema
);