const mongoose = require("mongoose");

const prayerRequestSchema = new mongoose.Schema({
  raisedBy: {
    required: true,
    type: String
  },
  requestMessage: {
    required: true,
    type: String
  },
  dateOfPosting: {
    type: Date,
    default: Date.now
  },
  responses: {
    type: Array,
    default: []
  },
  likes: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model("PrayerRequest", prayerRequestSchema);

