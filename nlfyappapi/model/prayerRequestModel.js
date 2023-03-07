const mongoose = require("mongoose");

const prayerRequestSchema = new mongoose.Schema({
  raisedBy: {
    type: String,
    required: true
  },
  requestMessage: {
    type: String,
    required: true
  },
  dateOfPosting: {
    type: Date,
    required: true
  },
  responses: [{
    responseBy: {
      type: String,
      required: true
    },
    dateOfResponse: {
      type: Date,
      required: true
    },
    responseMessage: {
      type: String,
      required: true
    }
  }],
  likes: [{
    likedBy: {
      type: String,
      required: true
    },
    dateOfLike: {
      type: Date,
      required: true
    }
  }]
},  { versionKey: false });

module.exports = mongoose.model("PrayerRequest", prayerRequestSchema);
