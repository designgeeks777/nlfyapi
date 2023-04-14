const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  submittedBy: {
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

module.exports = mongoose.model("Story", storySchema);
