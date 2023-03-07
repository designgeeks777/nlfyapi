const express = require("express");

const router = express.Router();

module.exports = router;

const Model = require("../model/prayerRequestModel");

//Post Method - prayerRequests
router.post("/prayerRequests", async (req, res) => {
    const data = new Model({
      raisedBy: req.body.raisedBy,
      requestMessage: req.body.requestMessage,
      dateOfPosting: req.body.dateOfPosting,
      responses: req.body.responses,
      likes: req.body.likes
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

    const result = await Model.findByIdAndUpdate(id, updatedData, options);
    res.send(result);
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
