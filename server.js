var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var exphbs = require("express-handlebars");
var orm = require('./config/orm.js');

// Set up the Express app to handle data parsing
var app = express();
app.use(express.json());
var PORT = process.env.PORT || 3000;

//var mysql = require('mysql');

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

var burgerForList = [];
var eatenList = [];

orm.selectAll(function (result) {
    // ready the list of non-devoured burgers
    for (let i = 0; i < result.length; i++) {
        if (result[i].devoured === 0) {
            burgerForList.push(result[i].burger_name);
        }
    }
});

app.get("/", function (req, res) {
    res.redirect("/burgers");
})

app.get("/burgers", function (req, res) {
    res.render('index', {
        foods: burgerForList,
        eaten: eatenList
    });
});

app.post('/burgers/submit', function (req, res) {
    let foundIndex = burgerForList.indexOf(req.body.string);
    if (foundIndex < 0) {
        // don't have this one
        burgerForList.push(req.body.string);
        orm.insertOne(req.body.string, 0);
        res.render("index", {
            foods: burgerForList,
            eaten: eatenList
        });
        return;
    } else {
        //        console.log("Old one: ", req.body.string);
        res.render("index", {
            foods: burgerForList,
            eaten: eatenList
        });
        return;
    }
});

app.post('/burgers/devour', function (req, res) {
    eatenList.push(req.body.string);
    let found = burgerForList.indexOf(req.body.string);
    orm.updateOne(req.body.string);
    if (found >= 0) {
        burgerForList.splice(found, 1);
    }
    res.render("index", {
        foods: burgerForList,
        eaten: eatenList
    });
});