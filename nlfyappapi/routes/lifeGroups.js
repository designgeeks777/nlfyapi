const express = require("express");

const router = express.Router();

module.exports = router;

const Model = require("../model/lifeGroupModel");

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.APP_URL);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});

//Post Method - LifeGroups
router.post("/lifeGroups", async (req, res) => {
  const data = new Model({
    place: req.body.place,
    meetingDay: req.body.meetingDay,
    leaders: req.body.leaders,
    members: req.body.members,
    joiningRequests: req.body.joiningRequests,
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

//Get count of joining requests method - lifeGroup
router.get("/getLifeGroupsCount", async (req, res) => {
  try {
    let count = 0;
    const data = await Model.find();
    data.forEach((object) => {
      object.joiningRequests.forEach((JRobject) => {
        if (JRobject.accepted === "false") {
          count++;
        }
      });
    });
    res.json(count);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
