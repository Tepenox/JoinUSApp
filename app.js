var express = require("express");
var app = express();
var mysql = require("mysql");
var faker = require("faker");
var bodyParser = require("body-parser");


app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.MYSQL_PW,
    database: "join_us_app"
})

//seed data
// var data = [];

// for (var i = 0; i < 500; i++) {

//     data.push([
//         faker.internet.email(),
//         faker.date.past()
//     ])

// }

// var q = 'INSERT INTO users (email,created_at) values ?'

// connection.query(q, [data], function (err, results, fields) {
//     if (err) throw err;
//     console.log(results);
// })

// connection.end();

app.get("/", function (req, res) {

    var q = 'SELECT COUNT(*) as count FROM users'
    connection.query(q, function (err, results) {
        if (err) throw err;
        var count = results[0].count;
        res.render("home", { data: count });

    })
})

app.post("/register", function (req, res) {

    var person = {
        email: req.body.email
    }
    console.log(person);
    var q = 'INSERT INTO users SET ?'

    connection.query(q, person, function (err, results, fields) {
        if (err) throw err;
        console.log(results);
        res.redirect("/");
    })
})

app.listen(3000, function () {
    console.log("server is up and running...");
})





