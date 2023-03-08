const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});

require("dotenv").config();

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const devotionals = require("./routes/devotionals");
app.use("/api", devotionals);

const users = require("./routes/users");
app.use("/api", users);


const prayerRequests = require("./routes/prayerRequests");
app.use("/api", prayerRequests);

const stories = require("./routes/stories");
app.use("/api", stories);

const sermons = require("./routes/sermons");
app.use("/api", sermons);

const events = require("./routes/events");
app.use("/api", events);

const lifeGroups = require("./routes/lifeGroups");
app.use("/api", lifeGroups);
