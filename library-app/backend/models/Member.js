const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: String,
  email: String,
  regNo: String,
  membership: String,
  status: {
    type: String,
    default: "Active"
  }
});

module.exports = mongoose.model(
  "Member",
  memberSchema
);