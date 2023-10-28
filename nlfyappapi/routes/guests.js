const express = require("express");

const router = express.Router();

module.exports = router;
const { Expo } = require("expo-server-sdk");

const Model = require("../model/guestModel");



//Post Method - Guests
router.post("/guests", async (req, res) => {
    const data = new Model({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address,
        contactnumber: req.body.contactnumber,
        email: req.body.email,
        dob: req.body.dob,
        enteredon: req.body.enteredon,
        gender: req.body.gender,
        maritalstatus: req.body.maritalstatus,
        hearaboutus: req.body.hearaboutus,
        invitedby: req.body.invitedby,
        hearaboutusothers: req.body.hearaboutusothers,
        willingnesstojoin: req.body.willingnesstojoin,
        lifegroupid: req.body.lifegroupid,
        followupmember: req.body.followupmember,
        followupnotes: req.body.followupnotes,
        startedlifegroup: req.body.startedlifegroup,

    });

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);    
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Get all Method - guests
router.get("/guests", async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Get by ID Method - Guest
router.get("/guests/:id", async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Update by ID Method - Guest
router.patch("/guests/:id", async (req, res) => {
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

//Delete by ID Method - Guests
router.delete("/guests/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id);
        res.send(`Document with ${data.name} has been deleted..`);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
