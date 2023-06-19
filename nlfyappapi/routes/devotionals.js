const express = require("express");

const router = express.Router();

module.exports = router;
const { Expo } = require("expo-server-sdk");

const Model = require("../model/devotionalModel");
const NotificationModel = require("../model/notificationsModel");

async function sendPushNotification() {
  let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });
  let messages = [];
  let expoTokens = [];
  try {
    const results = await NotificationModel.find({}, "expoToken").exec();
    const expoTokens = results.map((result) => result.expoToken);
    console.log(expoTokens);

    for (let pushToken of expoTokens) {
      console.log("push token", pushToken);
      // Check that all your push tokens appear to be valid Expo push tokens
      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
      }
      // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
      messages.push({
        to: pushToken,
        sound: "default",
        body: "Check Today's Devotional",
        data: { withSome: "data" },
      });

      let chunks = expo.chunkPushNotifications(messages);
      let tickets = [];
      (async () => {
        // Send the chunks to the Expo push notification service. There are
        // different strategies you could use. A simple one is to send one chunk at a
        // time, which nicely spreads the load out over time:
        for (let chunk of chunks) {
          try {
            let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
            console.log(ticketChunk);
            tickets.push(...ticketChunk);
            // NOTE: If a ticket contains an error code in ticket.details.error, you
            // must handle it appropriately. The error codes are listed in the Expo
            // documentation:
            // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
          } catch (error) {
            console.error(error);
          }
        }
      })();
    }
  } catch (error) {
    console.error("Error fetching expoTokens:", error);
  }
}

//Post Method - Devotionals
router.post("/devotionals", async (req, res) => {
  const data = new Model({
    subject: req.body.subject,
    content: req.body.content,
    datePosted: req.body.datePosted,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
    //Trigger notification
    //All pushTokens to be retrieved from notifications model
    //Construct the notification message body
    //Invoke the notification

    sendPushNotification();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all Method - Devotionals
router.get("/devotionals", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method - Devotional
router.get("/devotionals/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method - Devotional
router.patch("/devotionals/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Model.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method - Devotional
router.delete("/devotionals/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
