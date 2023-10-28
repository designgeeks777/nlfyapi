const express = require("express");
const { sendPushNotification } = require("../utils/sendNotification");

const router = express.Router();

module.exports = router;

const Model = require("../model/prayerRequestModel");
const NotificationModel = require("../model/notificationsModel");

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.APP_URL);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//Post Method - prayerRequests
router.post("/prayerRequests", async (req, res) => {
  const data = new Model({
    raisedBy: req.body.raisedBy,
    raisedByUid: req.body.raisedByUid,
    requestMessage: req.body.requestMessage,
    dateOfPosting: req.body.dateOfPosting,
    responses: req.body.responses,
    likes: req.body.likes,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all Method - prayerRequests
router.get("/prayerRequests", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method - prayerRequests
router.get("/prayerRequests/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method - prayerRequests
router.patch("/prayerRequests/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const originalData = await Model.findById(id);

    // Step 1: Split the requestMessage into an array of words
    const wordsArray = originalData.requestMessage.split(" ");

    // Step 2: Slice the array to get the first 10 words
    const first10WordsArray = wordsArray.slice(0, 10);

    // Step 3: Join the first 10 words back into a string
    const croppedMessage = first10WordsArray.join(" ");

    const result = await Model.findByIdAndUpdate(id, updatedData, options);
    res.send(result);

    const updatedField = Object.keys(updatedData).find(
      (field) => updatedData[field] !== originalData[field]
    );

    if (updatedField === "responses") {
      const uid = String(originalData.raisedByUid);

      let notification;
      try {
        notification = await NotificationModel.findOne({ uid });
      } catch (error) {
        console.error(
          "Error occurred while querying Notifications model:",
          error
        );
      }

      if (notification) {
        // Step 2: Retrieve the corresponding expoToken from the document
        const notificationMessage =
          "Someone just prayed for your prayer:" + croppedMessage;
        const expoToken = notification.expoToken;
        console.log(`ExpoToken: ${expoToken}`);
        sendPushNotification(
          [expoToken],
          "New Prayer Response Received for Prayer"
        );
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method - prayerRequests
router.delete("/prayerRequests/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data.raisedBy} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
