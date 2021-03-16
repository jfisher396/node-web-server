const path = require("path");
const express = require("express");
const hbs = require('hbs');

const app = express();
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//sets handlebars as the view engine
app.set('view engine', 'hbs');
//sets the views path to go to the 'templates' folder instead of default
app.set('views', viewsPath);
//tells the app to look in the partialsPath for any partials
hbs.registerPartials(partialsPath);

// allows express to render the files from the public folder
app.use(express.static(path.join(__dirname, "../public")));


app.get('', (req,res) => {
    res.render('index', {
        title: "Weather",
        name: "Lincoln Fisher"
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: "About",
        name: "Lincoln Fisher"
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: "Help!",
        message: "I need somebody!",
        name: "Lincoln Fisher"
    })
})

app.get("/weather", (req, res) => {
  res.send({
    city: "Seattle",
    temp: 38,
  });
});

app.get('/help/*', (req,res) => {
    res.render('404', {
        errorMessage: "Help article not found.",
        title: "404",
        name: "Lincoln Fisher"
    })
})

app.get("*", (req,res) => {
    res.render('404', {
        errorMessage: "Page not found.",
        title: "404",
        name: "Lincoln Fisher"
    })
})

app.listen(3000, () => console.log("App is listening on port 3000."));
