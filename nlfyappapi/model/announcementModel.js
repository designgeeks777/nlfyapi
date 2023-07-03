const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  announcement: {
    required: true,
    type: String,
  },

  datePosted: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Announcements", announcementSchema);
