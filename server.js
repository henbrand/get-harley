const cors = require("cors");
const express = require("express");
const { DateTime } = require("luxon");
const axios = require("axios");

const practitioners = require("./data/practitioners.json");
const specialities = require("./data/specialities.json");
const practionerSpecialities = require("./data/practitionerSpeciality.json");

const app = express();
const port = 3030;
app.use(cors());
app.use(express.json());

app.get("/practioners", (req, res) => {
  res.json(practitioners);
});

app.get("/specialities", (req, res) => {
  res.json(specialities);
});

const getAvailability = (date, email) =>
  axios.get(
    `https://api.freebusy.io/beta/week/${email}?tz=Europe/London&date=${date}`
  );

app.post("/available-practitioner", async (req, res) => {
  const { body } = req;

  const practitionersForASpeciality = practionerSpecialities
    .filter(
      (practionerSpeciality) =>
        practionerSpeciality.specialityId === body.specialityId
    )
    .map((practionerSpeciality) => practionerSpeciality.practitionerId);

  const practitionerBySpeciality = practitioners.filter((practitioner) =>
    practitionersForASpeciality.includes(practitioner.practitionerId)
  );

  const practitionerAvailabiliy = await Promise.all(
    practitionerBySpeciality.map(async (practitioner) => {
      try {
        const availabilityResponse = await getAvailability(
          body.selectedDate.dateString,
          practitioner.email
        );

        const availableTimeslots = availabilityResponse.data.days.find(
          (day) => {
            return DateTime.fromISO(day.date).equals(
              DateTime.fromISO(body.selectedDate.date)
            );
          }
        );

        const findSelectedTimeSlot = availableTimeslots.timeslots.find(
          (timeslot) =>
            DateTime.fromISO(timeslot.startTime).equals(
              DateTime.fromISO(body.selectedDate.dateTime)
            )
        );
        return { practitioner, isAvailable: findSelectedTimeSlot.isAvailable };
      } catch (e) {
        console.log("e", e);
      }
    })
  );

  res.json(practitionerAvailabiliy);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
