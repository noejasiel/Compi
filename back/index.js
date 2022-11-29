const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const { json } = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/getData", (req, res) => {
  fs.readFile("compi.txt", (err, data) => {
    if (err) throw err;
    return res.send(data);
  });
});

app.post("/sendData", (req, res) => {
  // let data = JSON.parse(req.body);

  console.log(req.body);
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
