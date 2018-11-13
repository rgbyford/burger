module.exports = async function (app) {
    // connection to mysql
    var mysql = require('mysql');
    //var inquirer = require('inquirer');

    console.log ("connection.js");

    var con = mysql.createConnection({
        database: "burgers_db",
        host: "localhost",
        user: "root",
        password: "0921"
    });

    //console.log (con);

    await con.connect(function (err) {
        if (err) throw err;
        console.log("connected as id ", con.threadId)
    });
    console.log ("after connect");
    return (con);

}