const express = require("express");

const router = express.Router();

module.exports = router;

const Model = require("../model/lifeGroupModel");

//Post Method - LifeGroups
router.post("/lifeGroups", async (req, res) => {
    const data = new Model({
        place: req.body.place,
        meetingDay: req.body.meetingDay,
        leaders: req.body.leaders,
        members: req.body.members
    });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all Method - lifeGroup
router.get("/lifeGroups", async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data);
    } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method - lifeGroup
router.get("/lifeGroups/:id", async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
        }
    });

//Update by ID Method - lifeGroup
router.patch("/lifeGroups/:id", async (req, res) => {
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

//Delete by ID Method - lifeGroup
router.delete("/lifeGroups/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data.place} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

