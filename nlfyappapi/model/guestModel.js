const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({
    firstname: {
        required: true,
        type: String,
    },
    lastname: {
        required: true,
        type: String,
    },
    address: {
        required: true,
        type: String,
    },
    contactnumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    dob: {
        type: String,
        required: true,
    },
    enteredon: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    maritalstatus: {
        type: String,
        required: true,
    },
    hearaboutus: {
        type: String,
        required: true,
    },
    invitedby: {
        type: String,
        required: false,
    },
    hearaboutusothers: {
        type: String,
        required: false,
    },
    willingnesstojoin: {
        type: String,
        required: false,
    },
    lifegroupid: {
        type: String,
        required: false,
    },
    followupmember: {
        type: String,
        required: false,
    },
    followupnotes: {
        type: Array,
        default: [],
    },
    startedlifegroup: {
        type: String,
        required: false,
    }
    
});

module.exports = mongoose.model("Guest", guestSchema);
