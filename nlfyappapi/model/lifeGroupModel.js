const mongoose = require("mongoose");

const lifeGroupSchema = new mongoose.Schema({
  place: {
    required: true,
    type: String,
  },
  meetingDay: {
    required: true,
    type: String,
  },
  leaders: {
    required: true,
    type: String,
  },
  members: {
    type: Array,
    default: [],
  },
  joiningRequests: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("LifeGroup", lifeGroupSchema);
