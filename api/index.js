const cors = require("cors");
const express = require("express");

const practitioners = require("../data/practitioners.json");
const specialities = require("../data/specialities.json");
const getPractitionerAvailability = require("./getAvailability.js");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/practioners", (req, res) => {
  console.log("helloooooooo");
  res.json(practitioners);
});

app.get("/api/specialities", (req, res) => {
  res.json(specialities);
});

app.post("/api/available-practitioner", async (req, res) => {
  const { body } = req;
  const practitionerAvailabiliy = await getPractitionerAvailability(body);
  res.json(practitionerAvailabiliy);
});

module.exports = app;
