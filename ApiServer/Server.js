const express = require('express')
const cors = require('cors')
const app = express()
// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'ifhDB',
    password: '1234'
});



app.use(cors())

app.get('/users', function (req, res, next) {
    // simple query
    connection.query(
        'SELECT * FROM users',
        function (err, results, fields) {
            console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
            res.json(results)
        }
    );
})

app.get('/products', function (req, res, next) {
    // simple query
    connection.query(
        'SELECT * FROM products',
        function (err, results, fields) {
            console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
            res.json(results)
        }
    );
})

app.get('/products/:name', function (req, res, next) {
    const name = req.params.name
    // simple query
    connection.query(
        'SELECT * FROM products where name like ?', '%' + [name] + '%',
        function (err, results, fields) {
            console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
            res.json(results[0])
        }
    );
})
app.listen(89, function () {
    console.log('CORS-enabled web server listening on port 89')
})