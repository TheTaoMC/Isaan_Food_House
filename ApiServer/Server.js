require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
// get the client
const mysql = require('mysql2');

// create the connection to database
/* const connection = mysql.createConnection({
    host: 'aws.connect.psdb.cloud',
    user: 'w0p8yavt10xc725rtrrj',
    database: 'reactnativedb',
    password: 'pscale_pw_mFsuIPtLxB2KqUEdveZkoW9Kdlo1zuvq4DzHSRQ0wjw',
    MYSQL_ATTR_SSL_CA='asd'
}); */

const conn = mysql.createConnection(process.env.DATABASE_URL)
console.log(process.env.DATABASE_URL)

app.use(cors())

app.get('/users', function (req, res, next) {
    conn.query(
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
    conn.query(
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
    conn.query(
        'SELECT * FROM products where name like ?', '%' + [name] + '%',
        function (err, results, fields) {
            console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
            res.json(results[0])
        }
    );
})
app.listen(process.env.PORT || 89, function () {
    console.log('CORS-enabled web server listening on port 89')
})