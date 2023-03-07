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
    //res.status(200).json(dataToSave);
    const dateOnly = dataToSave.dateOfPosting.toISOString().substring(0, 10); // Extract date portion of dateOfPosting
    res.status(200).json({ ...dataToSave.toObject(), dateOfPosting: dateOnly }); // Return dateOnly as a string in the response
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all Method - prayerRequests
router.get("/prayerRequests", async (req, res) => {
    try {
        const data = await Model.find();
        const dataWithDateOnly = data.map(d => {
          const dateOnly = d.dateOfPosting.toISOString().substring(0, 10); // Extract date portion of dateOfPosting
          return { ...d.toObject(), dateOfPosting: dateOnly }; // Return dateOnly as a string in the response
        });
        res.json(dataWithDateOnly);
    } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method - prayerRequests
router.get("/prayerRequests/:id", async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        const dateOnly = data.dateOfPosting.toISOString().substring(0, 10); // Extract date portion of dateOfPosting
        res.json({ ...data.toObject(), dateOfPosting: dateOnly }); // Return dateOnly as a string in the response
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
    const dateOnly = result.dateOfPosting.toISOString().substring(0, 10); // Extract date portion of dateOfPosting
    res.json({ ...result.toObject(), dateOfPosting: dateOnly }); // Return dateOnly as a string in the response
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method - prayerRequests
router.delete("/prayerRequests/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    const dateOnly = data.dateOfPosting.toISOString().substring(0, 10); // Extract date portion of dateOfPosting
    res.send(`Document with ${data.raisedBy} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
