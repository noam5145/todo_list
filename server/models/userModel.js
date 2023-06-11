const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  rank: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    unique: true,
  },
  access: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("users", userSchema);
