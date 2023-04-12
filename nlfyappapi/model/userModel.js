const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: {
    required: true,
    type: String,
  },
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
    // type: Number,
    type: String,
  },
  profilePic: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("User", userSchema);
