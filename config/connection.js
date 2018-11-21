 var mysql = require('mysql');
 
if (process.env.JAWSDB_URL) {
    con = mysql.createConnection(process.env.JAWSDB_URL)
} else {
    con = mysql.createConnection({
        database: "burgers_db",
        host: "localhost",
        user: "root",
        password: "0921"
    });
}

con.connect(function (err) {
     if (err) throw err;
     console.log("connected as id ", con.threadId)
     return;
 });

 module.exports = con;