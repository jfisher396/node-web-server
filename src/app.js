require("dotenv").config();
const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const PORT = process.env.PORT || 3000;

const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//sets handlebars as the view engine
app.set("view engine", "hbs");
//sets the views path to go to the 'templates' folder instead of default
app.set("views", viewsPath);
//tells the app to look in the partialsPath for any partials
hbs.registerPartials(partialsPath);

// allows express to render the files from the public folder
app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "James Fisher",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "James Fisher",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help!",
    message: "I need somebody!",
    name: "James Fisher",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a valid address.",
    });
  }

  geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.send({ err });
    }

    // forecast function requires 3 arguments: latitude, longitude and a callback function
    forecast(latitude, longitude, (err, forecastData) => {
      if (err) {
        return res.send({ err });
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term.",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help article not found.",
    title: "404",
    name: "Lincoln Fisher",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "Page not found.",
    title: "404",
    name: "Lincoln Fisher",
  });
});

app.listen(PORT, () => console.log(`App is listening on port ${PORT}.`));
