const express = require("express");
const { sendPushNotification } = require("../utils/sendNotification");

const router = express.Router();

module.exports = router;

const Model = require("../model/announcementModel");
const NotificationModel = require("../model/notificationsModel");

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//Post Method - Announcements
router.post("/announcements", async (req, res) => {
  const data = new Model({
    title: req.body.title,
    announcement: req.body.announcement,
    datePosted: req.body.datePosted,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);

    const results = await NotificationModel.find({}, "expoToken").exec();
    const expoTokens = results.map((result) => result.expoToken);
    console.log(expoTokens);

    // Send push notification
    await sendPushNotification(expoTokens, req.body.title);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all Method - Announcements
router.get("/announcements", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method - Announcements
router.get("/announcements/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method - Announcements
router.patch("/announcements/:id", async (req, res) => {
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

//Delete by ID Method - Announcements
router.delete("/announcements/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
