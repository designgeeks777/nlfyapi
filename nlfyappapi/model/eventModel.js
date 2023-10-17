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
    isRecurring: { type: Boolean, default: false },
    recurrenceType: { type: String },
    endDate: { type: Date },
    recurrenceDays: [{ type: String }],
    customEventRepeatType: { type: String },
    recurrenceCount: { type: Number },
  },
  typeOfEvent: {
    type: String,
  },
  nameOfEvent: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Event", eventSchema);
