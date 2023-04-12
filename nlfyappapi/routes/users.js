const express = require("express");
const multer = require("multer");

const router = express.Router();
module.exports = router;
const Model = require("../model/userModel");

const DIR = "./public/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});
let User = require("../model/userModel");
router.post("/users", upload.single("profilePic"), (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const user = new User({
    uid: req.body.uid,
    name: req.body.name,
    gender: req.body.gender,
    mobileNumber: req.body.mobileNumber,
    profilePic: url + "/public/" + req.file.filename,
  });
  // console.log("DATA", user, req.file);
  user
    .save()
    .then((result) => {
      res.status(201).json({
        message: "User registered successfully!",
        userCreated: {
          _id: result._id,
          uid: result.uid,
          name: result.name,
          gender: result.gender,
          mobileNumber: result.mobileNumber,
          profilePic: result.profilePic,
        },
      });
    })
    .catch((err) => {
      console.log(err),
        res.status(500).json({
          error: err,
        });
    });
});

//Post Method - Users
// router.post("/users", async (req, res) => {
//   const data = new Model({
//     uid: req.body.uid,
//     name: req.body.name,
//     gender: req.body.gender,
//     mobileNumber: req.body.mobileNumber,
//     profilePic: req.body.profilePic,
//   });

//   try {
//     const dataToSave = await data.save();
//     res.status(200).json(dataToSave);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

//Get all Method - Users
router.get("/users", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method - Users
router.get("/usersById/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by MobileNumber Method - Users
router.get("/users/:mobileNumber", async (req, res) => {
  try {
    const query = { mobileNumber: req.params.mobileNumber };
    const data = await Model.findOne(query);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method - Users
router.patch("/users/:id", upload.single("profilePic"), async (req, res) => {
  try {
    const url = req.protocol + "://" + req.get("host");
    const updatedBody = {
      uid: req.body.uid,
      name: req.body.name,
      gender: req.body.gender,
      mobileNumber: req.body.mobileNumber,
      profilePic: url + "/public/" + req.file.filename,
    };
    const id = req.params.id;
    // const updatedData = req.body;
    const updatedData = updatedBody;
    const options = { new: true };

    const result = await Model.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method - Users
router.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
