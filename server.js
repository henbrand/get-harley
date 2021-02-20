const practitioners = require("./data/practitioners.json");
const specialities = require("./data/specialities.json");
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
