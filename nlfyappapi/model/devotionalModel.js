const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  age: {
    required: true,
    type: Number,
  },
});

const devotionalSchema = new mongoose.Schema({
  subject: {
    required: true,
    type: String,
  },
  content: {
    required: true,
    type: String,
  },
  datePosted: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Data", dataSchema);
module.exports = mongoose.model("Devotional", devotionalSchema);
