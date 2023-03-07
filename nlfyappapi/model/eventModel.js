const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  dateOfEvent: {
    required: true,
    type: String,
  },
  placeOfEvent: {
    required: true,
    type: String,
  },
  timeOfEvent: {
    required: true,
    type: String,
  },
  recurringEvent: {
    required: false,
    type: String,
    default: "",
  },
  nameOfEvent: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Event", eventSchema);
