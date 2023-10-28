const mongoose = require("mongoose");

const leaderSchema = new mongoose.Schema({
    
    firstname: {
        required: true,
        type: String,
    },
    lastname: {
        required: true,
        type: String,
    },
    gmailid: {
        required: true,
        type: String,
    },
    lastlogintime: {
        required: false,
        type: String,
    },
    
});

module.exports = mongoose.model("Leader", leaderSchema);
