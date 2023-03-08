const mongoose = require("mongoose");

const lifeGroupSchema = new mongoose.Schema({
  place: {
    required: true,
    type: String
  },
  meetingDay: {
    required: true,
    type: String
  },
  leaders: {
    type: Array,
    default: []
  },
  members: {
    type: Array,
    default: []
  }
} );

module.exports = mongoose.model("LifeGroup", lifeGroupSchema);