const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  submittedBy: {
    required: true,
    type: String,
  },
  storyMessage: {
    required: true,
    type: String,
  },
  dateOfPosting: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Story", storySchema);
