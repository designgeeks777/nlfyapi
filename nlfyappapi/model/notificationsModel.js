const mongoose = require("mongoose");

const notificationsSchema = new mongoose.Schema({
  expoToken: {
    required: true,
    type: String,
  },

  uid: {
    required: false,
    type: String,
  },
});

module.exports = mongoose.model("Notifications", notificationsSchema);
