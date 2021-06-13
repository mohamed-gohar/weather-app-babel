// Require Express to run server and routes
const express = require("express");
const path = require("path");
// Start up an instance of app
const app = express();

// Cors for cross origin allowance
const cors = require("cors");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
// express 4.16.0+ has Built-in middleware (urlencoded,json)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

/* server and routes */

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Setup Server
const port = 5000;
const server = app.listen(port, () => {
  console.log(`server states on port ${port}`);
});

//set routes
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/website/index.html"));
});

app.get("/getData", function (req, res) {
  res.send(projectData);
});

app.post("/addData", function (req, res) {
  const body = req.body;
  projectData = {
    temp: body.temp,
    Country: body.Country,
    date: body.date,
    userResponse: body.userResponse,
  };

  console.log(projectData);
  res.send(projectData);
});
