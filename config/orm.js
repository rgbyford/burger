var con;
module.exports = function (app) {
    //     console.log ("orm module");
    con = require('./connection.js')(app);
    console.log("ormcon: ", con.state);
    return (con);
    // //    console.log (con);
}

//    function selectAll() {
module.exports.selectAll = function (con) {
    //        con = require('./connection.js') (app);
    //    console.log("orm.js con state ", con.state);
    // get the list of burgers
    con.query("SELECT * FROM burgers", function (err, result) {
        if (err) throw err;
        return result;
        // result.forEach(element => {
        //     console.log(`Product: ${element.item_id} ${element.product_name} $${element.price}`);
        // })
    });
}

function insertOne() {
    // add a new one to the list
}

function updateOne() {
    // increase the quantity devoured
}
//  console.log ("selectAll:", typeof (selectAll));
//}