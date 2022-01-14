const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();

//Define path for express
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname, "../template/partials");
//setup handlebar engin and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "nay",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about me",
    name: "nay",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "This is helpful text",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "please provide address" });
  }
  geocode(req.query.address, (error, { Lat, Lon, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(Lat, Lon, (error, forcastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forcastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("//products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide search term",
    });
  }
  console.log(req.query.search);
  res.send({ product: [] });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "nay",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "nay",
    errorMessage: "page not found",
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});
