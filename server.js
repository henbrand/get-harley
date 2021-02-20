const practitioners = require("./data/practitioners.json");
const specialities = require("./data/specialities.json");
const practionerSpecialities = require("./data/specialities.json");
const cors = require("cors");
const express = require("express");

const app = express();
const port = 3030;
app.use(cors());

app.get("/practioners", (req, res) => {
  res.json(practitioners);
});

app.get("/specialities", (req, res) => {
  res.json(specialities);
});

app.post("/available-timeslot", (req, res) => {
  const { specialityId } = req;
  const practitionerIds = practionerSpecialities
    .filter(
      (practionerSpeciality) =>
        practionerSpeciality.specialityId === specialityId
    )
    .map((practionerSpeciality) => practionerSpeciality.practitionerId);

  const availablePractitioners = practitioners.filter((practitioner) =>
    practitionerIds.includes(practitioner.practitionerId)
  );
  res.json(availablePractitioners);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
