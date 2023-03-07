const mongoose = require("mongoose");

const sermonSchema = new mongoose.Schema({
  dateOfPosting: {
    required: true,
    type: String,
  },
  title: {
    required: true,
    type: String,
  },
  videoLink: {
    required: true,
    type: String,
  },
  notes: {
    required: false,
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Sermon", sermonSchema);
