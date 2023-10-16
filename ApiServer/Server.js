require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
// get the client
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const secret = 'jwt';
const jsonParser = bodyParser.json();

// create the connection to database
/* const connection = mysql.createConnection({
    host: 'aws.connect.psdb.cloud',
    user: 'w0p8yavt10xc725rtrrj',
    database: 'reactnativedb',
    password: 'pscale_pw_mFsuIPtLxB2KqUEdveZkoW9Kdlo1zuvq4DzHSRQ0wjw',
    MYSQL_ATTR_SSL_CA='asd'
}); */

const conn = mysql.createConnection(process.env.DATABASE_URL);
console.log(process.env.DATABASE_URL);

app.use(cors());

app.get('/api/users', function (req, res, next) {
  conn.query('SELECT * FROM users', function (err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
    res.json(results);
  });
});

app.get('/api/products', function (req, res, next) {
  // simple query
  conn.query('SELECT * FROM products', function (err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
    res.json(results);
  });
});

app.get('/api/products/:name', function (req, res, next) {
  const name = req.params.name;
  // simple query
  conn.query(
    'SELECT * FROM products where name like ?',
    '%' + [name] + '%',
    function (err, results, fields) {
      console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results, if available
      res.json(results);
    },
  );
});

// POST /register gets JSON bodies
app.post('/api/register', jsonParser, function (req, res, next) {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    conn.execute(
      'insert into users (fname,lname,email,username,password) values (?,?,?,?,?)',
      [req.body.fname, req.body.lname, req.body.email, req.body.username, hash],
      function (err, results, fields) {
        if (err) {
          res.json({status: 'error', message: err});
          return;
        }
        res.json({status: 'ok'});
      },
    );
  });
});

// POST /login
app.post('/api/login', jsonParser, function (req, res, next) {
  conn.execute(
    'select * from users where username = ?',
    [req.body.username],
    function (err, results, fields) {
      if (err) {
        res.json({status: 'error', message: err});
        return;
      }
      if (results.length === 0) {
        res.json({status: 'error', message: 'user not found!!!'});
        return;
      }
      bcrypt.compare(
        req.body.password,
        results[0].password,
        function (err, result) {
          if (result) {
            const token = jwt.sign({username: results[0].username}, secret, {
              expiresIn: 60 * 15,
            });
            res.json({status: 'ok', message: 'login success', token});
            return;
          } else {
            res.json({status: 'error', message: 'login failed'});
            return;
          }
        },
      );
    },
  );
});

// POST /authen
app.post('/api/authen', jsonParser, function (req, res, next) {
    //****** */
});

app.listen(89, function () {
  console.log('CORS-enabled web server listening on port 89');
});
