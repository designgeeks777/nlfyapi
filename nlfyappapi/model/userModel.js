const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  gender: {
    required: true,
    type: String,
  },
  mobileNumber: {
    required: true,
    type: Number,
  },
  profilePic: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("User", userSchema);
