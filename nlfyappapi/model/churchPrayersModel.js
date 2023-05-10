const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  prayerPoint: {
    required: true,
    type: String,
  },

  datePosted: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("ChurchPrayers", storySchema);
