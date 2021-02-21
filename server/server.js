const cors = require("cors");
const express = require("express");

const practitioners = require("../data/practitioners.json");
const specialities = require("../data/specialities.json");
const getPractitionerAvailability = require("./getAvailability.js");

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

app.post("/available-practitioner", async (req, res) => {
  const { body } = req;
  const practitionerAvailabiliy = await getPractitionerAvailability(body);
  res.json(practitionerAvailabiliy);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
