var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var exphbs = require("express-handlebars");
//require('handlebars-form-helpers').register(hbs.handlebars);

//var fs = require('fs');
//var sqlCon = require('./config/connection')(app);

var app = express();
app.use(express.json());
var PORT = process.env.PORT || 3000;

//const ormCon = require ('./config/orm');
//const con = require ('./config/connection');
//console.log ("In server.js.  Conection state:", ormCon.state);
//const ormCon = require ('./config/orm');
var mysql = require('mysql');
//var inquirer = require('inquirer');

var con = mysql.createConnection({
    database: "burgers_db",
    host: "localhost",
    user: "root",
    password: "0921"
});

//console.log (con);

con.connect(function (err) {
    if (err) throw err;
    console.log("connected as id ", con.threadId)
});
console.log("after connect");

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());
// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.get("/index", function (req, res) {
    con.query("SELECT * FROM burgers", function (err, result) {
        if (err) throw err;
        let burgerData = [];
        result.forEach(function (thisOne, i) {
            burgerData.push(thisOne.burger_name);
        });
        console.log("bD: ", burgerData);
        res.render("index", {
            eater: "Roger",
            foods: burgerData
        });
    });
    //    res.render("index", {});
});

app.get("/burgers", function (req, res) {
    // the following should be in orm.js, but I had no success putting it there.
    con.query("SELECT * FROM burgers", function (err, result) {
        if (err) throw err;
        let burgerData = [];
        result.forEach(function (thisOne, i) {
            burgerData.push(thisOne.burger_name);
        });
        console.log(burgerData);
        res.render("index", {
            eater: "Roger",
            foods: burgerData
        });
    });
});

var burgerForList = [];
var eatenList = [];

app.get("/choices", function (req, res) {
    console.log("GET request to the choices page");
    console.log("get: ", burgerForList);
    res.render("index", {
        eater: "Roger",
        foods: burgerForList,
        eaten: eatenList
    });
    console.log(burgerForList);
});


app.post('/choices/submit', function (req, res) {
    burgerForList.push(req.body.string);
    res.render("index", {
        foods: burgerForList,
        eaten: eatenList
    });
    return;
});

app.post('/choices/devour', function (req, res) {
    eatenList.push(req.body.string);
    let found = burgerForList.indexOf (req.body.string);
    if (found >= 0) {
        burgerForList.splice(found, 1);
    }
    res.render("index", {
        foods: burgerForList,
        eaten: eatenList
    });
    return;
});