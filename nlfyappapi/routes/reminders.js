const { sendPushNotification } = require("../utils/sendNotification");
const express = require("express");
const router = express.Router();
module.exports = router;

const NotificationModel = require("../model/notificationsModel");
// POST Method - reminders
router.post("/reminders", async (req, res) => {
  try {
    const results = await NotificationModel.find({}, "expoToken").exec();
    const expoTokens = results.map((result) => result.expoToken);
    console.log(expoTokens);
    
    // Send push notification
    await sendPushNotification(expoTokens, req.body.message);
    // Respond with the posted message
    res.status(200).json({ message: req.body.message });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
