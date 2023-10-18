const express = require("express");

const router = express.Router();

module.exports = router;

const Model = require("../model/eventModel");

//Post Method - Events
router.post("/events", async (req, res) => {
  const eventData = req.body;

  // Check if the event is recurring
  if (eventData.recurringEvent.isRecurring) {
    // Generate and save recurring event instances
    const recurringEventInstances = generateRecurringEventInstances(eventData);
    try {
      const savedInstances = await Model.insertMany(recurringEventInstances);
      res.status(200).json(savedInstances);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    // Save a single non-recurring event
    const data = new Model(eventData);
    try {
      const dataToSave = await data.save();
      res.status(200).json(dataToSave);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
});

const isLeapYear = function (year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};
const getDaysInMonth = function (year, month) {
  return [
    31,
    isLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ][month];
};
function addMonths(input, time) {
  const date = new Date(input);
  date.setDate(1);
  if (date.getMonth() <= 7) {
    date.setMonth(date.getMonth() + 6);
  } else {
    date.setMonth(date.getMonth() + (11 - date.getMonth()));
  }
  date.setDate(
    Math.max(
      input.getDate(),
      // date.getDate(),
      getDaysInMonth(date.getFullYear(), date.getMonth())
    )
  );
  const [hour, minute] = time.split(":");
  date.setUTCHours(hour, minute);
  return date;
}

function generateRecurringEventInstances(eventData) {
  // Implement logic to generate recurring event instances based on eventData
  // This could involve parsing the recurrence pattern and generating dates
  // within the specified time frame.
  // For example, if it's a weekly recurrence, generate dates for each week.
  let recurringEventInstances = [
    {
      dateOfEvent: eventData.dateOfEvent,
      placeOfEvent: eventData.placeOfEvent,
      startTimeOfEvent: eventData.startTimeOfEvent,
      endTimeOfEvent: eventData.endTimeOfEvent,
      nameOfEvent: eventData.nameOfEvent,
      typeOfEvent: eventData.typeOfEvent,
    },
  ];
  const startDate = new Date(eventData.dateOfEvent);
  const [hour, minute] = eventData.startTimeOfEvent.split(":");
  startDate.setUTCHours(hour, minute);
  const dayNumbers = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };
  const dateIncrementCount = {
    1: 0,
    2: 7,
    3: 14,
    4: 21,
    5: 28,
  };
  if (
    eventData.recurringEvent.recurrenceType === "everyWeekdayMondayToFriday"
  ) {
    var weeks = new Array();
    startDate.setDate(startDate.getDate() - startDate.getDay() + 1);
    for (var i = 0; i < 5; i++) {
      weeks.push(new Date(startDate));
      startDate.setDate(startDate.getDate() + 1);
    }
    recurringEventInstances = weeks.map((date) => {
      recurringEventInstances.map((event) => {
        data = { ...event, dateOfEvent: date.toLocaleDateString("en-GB") };
      });
      return data;
    });
  }
  if (eventData.recurringEvent.recurrenceType === "weekly") {
    var daysOfWeek = [];
    const endDate = addMonths(startDate, eventData.endTimeOfEvent);
    var currentDate = new Date(startDate);
    while (currentDate < endDate) {
      daysOfWeek.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 7);
    }
    daysOfWeek = daysOfWeek.map((i) => {
      return [i.getDate(), i.getMonth() + 1, i.getFullYear()].join("/");
    });

    console.log("daysOfWeek", daysOfWeek);
    recurringEventInstances = daysOfWeek.map((date) => {
      recurringEventInstances.map((event) => {
        data = { ...event, dateOfEvent: date };
      });
      return data;
    });
  }
  if (eventData.recurringEvent.recurrenceType === "daily") {
    const date = new Date(startDate);
    const dates = [];
    const endDate = addMonths(startDate, eventData.endTimeOfEvent);
    while (date <= endDate) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    console.log(startDate, endDate);
    recurringEventInstances = dates.map((date) => {
      recurringEventInstances.map((event) => {
        data = { ...event, dateOfEvent: date.toLocaleDateString("en-GB") };
      });
      return data;
    });
  }
  if (eventData.recurringEvent.recurrenceType === "monthly") {
    var dates = [];
    var firstDayOfNextMonth;
    var weekNumberOfMonth = eventData.recurringEvent.recurrenceDays[0];
    var dayOfTheWeek =
      dayNumbers[eventData.recurringEvent.recurrenceDays[1].toLowerCase()];
    const endDate = addMonths(startDate, eventData.endTimeOfEvent);
    const todaysDate = new Date();
    let currentDate = startDate;
    while (currentDate <= endDate) {
      dates.push(currentDate.toLocaleDateString("en-GB"));
      // Get next month's index(0 based)
      // const nextMonth = currentDate.getMonth() + 1;
      const nextMonth = currentDate.getMonth() + recurrenceCount;
      const year = currentDate.getFullYear();
      firstDayOfNextMonth = new Date(year, nextMonth % 12, 1);
      var nextDate =
        firstDayOfNextMonth.getDate() +
        ((dayOfTheWeek - firstDayOfNextMonth.getDay() + 7) % 7) +
        dateIncrementCount[weekNumberOfMonth];
      var nextMonthDate = new Date(
        year,
        nextMonth,
        year === todaysDate.getFullYear() && nextMonth === 12
          ? nextDate - 1
          : nextDate
      );
      console.log(
        currentDate.toLocaleDateString(),
        nextMonthDate.toLocaleDateString()
      );
      currentDate = nextMonthDate;
    }
    console.log(dates);
    recurringEventInstances = dates.map((date) => {
      recurringEventInstances.map((event) => {
        data = { ...event, dateOfEvent: date };
      });
      return data;
    });
  }
  if (eventData.recurringEvent.recurrenceType === "custom") {
    console.log("custom");
    const customEventRepeatType =
      eventData.recurringEvent.customEventRepeatType;
    const recurrenceCount = eventData.recurringEvent.recurrenceCount;
    var recurrenceDays = eventData.recurringEvent.recurrenceDays;
    const endDate = (eventData.recurringEvent.endDate =
      eventData.recurringEvent.endDate === ""
        ? addMonths(startDate, eventData.endTimeOfEvent)
        : new Date(eventData.recurringEvent.endDate));
    if (customEventRepeatType === "month" && Array.isArray(recurrenceDays)) {
      var dates = [];
      var firstDayOfNextMonth;
      var weekNumberOfMonth = eventData.recurringEvent.recurrenceDays[0];
      var dayOfTheWeek =
        dayNumbers[eventData.recurringEvent.recurrenceDays[1].toLowerCase()];
      const todaysDate = new Date();
      let currentDate = startDate;
      while (currentDate <= endDate) {
        dates.push(currentDate.toLocaleDateString("en-GB"));
        // Get next month's index(0 based)
        // const nextMonth = currentDate.getMonth() + 1;
        const nextMonth = currentDate.getMonth() + recurrenceCount;
        const year = currentDate.getFullYear();
        firstDayOfNextMonth = new Date(year, nextMonth % 12, 1);
        var nextDate =
          firstDayOfNextMonth.getDate() +
          ((dayOfTheWeek - firstDayOfNextMonth.getDay() + 7) % 7) +
          dateIncrementCount[weekNumberOfMonth];
        var nextMonthDate = new Date(
          year,
          nextMonth,
          year === todaysDate.getFullYear() && nextMonth === 12
            ? nextDate - 1
            : nextDate
        );
        console.log(
          currentDate.toLocaleDateString(),
          nextMonthDate.toLocaleDateString()
        );
        currentDate = nextMonthDate;
      }
      console.log(dates);
      recurringEventInstances = dates.map((date) => {
        recurringEventInstances.map((event) => {
          data = { ...event, dateOfEvent: date };
        });
        return data;
      });
    }
    if (customEventRepeatType === "month" && !Array.isArray(recurrenceDays)) {
      let dates = [];
      let currentDate = startDate;
      var nextMonthDate = "";
      while (currentDate <= endDate) {
        dates.push(currentDate.toLocaleDateString("en-GB"));
        currentDate.setMonth(currentDate.getMonth() + recurrenceCount);
      }
      console.log(dates);
      recurringEventInstances = dates.map((date) => {
        recurringEventInstances.map((event) => {
          data = { ...event, dateOfEvent: date };
        });
        return data;
      });
    }
    if (customEventRepeatType === "week") {
      let currentDate = startDate;
      // let startdate = startDate.toLocaleDateString("de-DE");
      // startdate = startdate.split(".").join("/");
      var dates = [];
      var days = {
        sunday: 0,
        monday: 1,
        tuesday: 2,
        wednesday: 3,
        thursday: 4,
        friday: 5,
        saturday: 6,
      };
      console.log(recurrenceCount, endDate);
      while (currentDate <= endDate) {
        for (j = 0; j < recurrenceDays.length; j++) {
          var dayNumber = days[recurrenceDays[j].toLowerCase()];
          if (currentDate <= endDate) {
            currentDate.setDate(
              currentDate.getDate() +
                ((dayNumber - currentDate.getDay() + recurrenceCount * 7) %
                  (recurrenceCount * 7))
            );
            dates.push(currentDate.toLocaleDateString("en-GB"));
            dates = dates.filter(
              (item, index) => dates.indexOf(item) === index
            );
          }
        }
      }
      recurringEventInstances = dates.map((date) => {
        recurringEventInstances.map((event) => {
          data = { ...event, dateOfEvent: date };
        });
        return data;
      });
      console.log(dates);
    }
    if (customEventRepeatType === "day") {
      const date = new Date(startDate);
      const dates = [];
      while (date <= endDate) {
        dates.push(new Date(date));
        date.setDate(date.getDate() + recurrenceCount);
      }
      console.log(endDate, dates);
      recurringEventInstances = dates.map((date) => {
        recurringEventInstances.map((event) => {
          data = { ...event, dateOfEvent: date.toLocaleDateString("en-GB") };
        });
        return data;
      });
    }
  }
  // Return an array of recurring event instances
  return recurringEventInstances;
}

//Get all Method - Events
router.get("/events", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method - Events
router.get("/events/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method - Events
router.patch("/events/:id", async (req, res) => {
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

//Delete by ID Method - Events
router.delete("/events/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
