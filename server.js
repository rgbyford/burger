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

var burgerForList = [];
var eatenList = [];

// the following should be in orm.js, but I had no success putting it there.
// con.query("SELECT * FROM burgers", function (err, result) {
//     if (err) throw err;
//     result.forEach(function (thisOne, i) {
//         burgerForList.push(thisOne.burger_name);
//     });
//     console.log(burgerForList);
//     res.render("index", {
//         foods: burgerForList
//     });
// });

// app.get("/index", function (req, res) {
//     console.log ("get index");
//     con.query("SELECT * FROM burgers", function (err, result) {
//         if (err) throw err;
//         result.forEach(function (thisOne, i) {
//             burgerForList.push(thisOne.burger_name);
//         });
//         console.log("bD: ", burgerForList);
//         res.render("index", {
//             foods: burgerForList
//         });
//     });
//     //    res.render("index", {});
// });

app.get("/burgers", function (req, res) {
//    console.log ("get burgers");
    res.render('index', {
        foods: burgerForList,
        eaten: eatenList
     });
});


// app.get("/choices", function (req, res) {
//     console.log("GET request to the choices page");
//     console.log("get: ", burgerForList);
//     res.render("index", {
//         foods: burgerForList,
//         eaten: eatenList
//     });
//     console.log(burgerForList);
// });


app.post('/burgers/submit', function (req, res) {
    let foundIndex = burgerForList.indexOf(req.body.string);
    if (foundIndex < 0) {
        // don't have this one
        burgerForList.push(req.body.string);
        con.query(`INSERT INTO burgers (burger_name, devoured) VALUES ('${req.body.string}', 0)`, function (err, result) {
            if (err) throw err;
//            console.log("New one: ", req.body.string);
//            console.log (burgerForList);
            res.render("index", {
                foods: burgerForList,
                eaten: eatenList
            });
            return;
        });
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
//    console.log(burgerForList);
    let found = burgerForList.indexOf(req.body.string);
    query = con.query(`UPDATE burgers SET devoured = devoured + 1 WHERE burger_name = '${req.body.string}';`,
        function (err, result) {
            if (err) throw err;
        });
//    console.log("devour found: ", found);
//    console.log(req.body.string);
    if (found >= 0) {
        burgerForList.splice(found, 1);
    }
//    console.log(burgerForList);
    res.render("index", {
        foods: burgerForList,
        eaten: eatenList
    });
});