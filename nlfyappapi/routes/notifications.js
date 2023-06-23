const express = require("express");
const router = express.Router();
module.exports = router;

const Model = require("../model/notificationsModel");

//GET all Method - notifications
router.get("/notifications", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//POST all Method - notifications
router.post("/notifications", async (req, res) => {
  const { expoToken, uid } = req.body;

  try {
    let existingData = await Model.findOne({ expoToken });

    if (existingData) {
      existingData.uid = uid;
      await existingData.save();
      res.status(200).json(existingData);
    } else {
      const newData = new Model({
        expoToken,
        uid,
      });
      const dataToSave = await newData.save();
      res.status(200).json(dataToSave);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
