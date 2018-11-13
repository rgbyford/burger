var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var exphbs = require("express-handlebars");
//require('handlebars-form-helpers').register(hbs.handlebars);

//var fs = require('fs');
//var sqlCon = require('./config/connection')(app);

var app = express();
app.use (express.json());
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

var burgerForList;

app.get("/choices", function (req, res) {
    console.log ("GET request to the choices page");
    res.render("index", {
        burgerWanted: burgerForList
    });
    console.log(burgerForList);
});


app.post('/choices/submit', function (req, res) {
    console.log ('POST request to the choices page');
    console.log (req.body);         // correctly prints a string (burger wanted) inserted in there
    res.send('POST request to the choices page');
});

