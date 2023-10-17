/* eslint-disable handle-callback-err */
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
//console.log(process.env.DATABASE_URL);

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
                    res.json({ status: 'error', message: err });
                    return;
                }
                res.json({ status: 'ok' });
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
                res.json({ status: 'error', message: err });
                return;
            }
            if (results.length === 0) {
                res.json({ status: 'error', message: 'user not found!!!' });
                return;
            }
            bcrypt.compare(
                req.body.password,
                results[0].password,
                function (err, result) {
                    if (result) {
                        const token = jwt.sign({ username: results[0].username }, secret, {
                            expiresIn: req.body.exptime,
                        });
                        res.json({ status: 'ok', message: 'login success', token });
                        return;
                    } else {
                        res.json({ status: 'error', message: 'login failed' });
                        return;
                    }
                },
            );
        },
    );
});

// POST /authen
app.post('/api/authen', jsonParser, function (req, res, next) {
    const token = req.headers.authorization.split(' ')[1]; // ใช้ req.headers.authorization
    try {
        const decoded = jwt.verify(token, secret);
        res.json({ status: 'ok', decoded });
    } catch (err) {
        res.json({ status: 'error', message: err.message }); // ตรวจสอบข้อผิดพลาดในการตรวจสอบ token
    }
});

app.post('/api/addtimetoken', jsonParser, function (req, res, next) {
    const token = req.headers.authorization.split(' ')[1]; // ใช้ req.headers.authorization
    try {
        const decoded = jwt.verify(token, secret);

        console.log('1.', decoded.username)
        const updatetoken = jwt.sign({ username: decoded.username }, secret, {
            expiresIn: req.body.exptime,
        });

        res.json({ status: 'ok', decoded, updatetoken });
    } catch (err) {
        res.json({ status: 'error', message: err.message }); // ตรวจสอบข้อผิดพลาดในการตรวจสอบ token
    }
});

app.put('/api/users/:id', jsonParser, function (req, res) {
    const userId = req.params.id;
    const updatedUserData = req.body;

    // ตรวจสอบความถูกต้องของข้อมูลที่รับมา (optional)
    if (!userId) {
        res.status(400).json({ status: 'error', message: 'Invalid user ID' });
        return;
    }

    // ตรวจสอบว่ามีข้อมูลที่จะอัปเดตหรือไม่
    if (!updatedUserData || Object.keys(updatedUserData).length === 0) {
        res.status(400).json({ status: 'error', message: 'No user data provided for update' });
        return;
    }

    // ในตัวอย่างนี้เราสมมติว่ามีฐานข้อมูลเก็บข้อมูลผู้ใช้ที่ชื่อ users
    // และมีฐานข้อมูลเชื่อมต่อที่ชื่อ conn

    // สร้างคำสั่ง SQL สำหรับการอัปเดตข้อมูลผู้ใช้
    const sql = 'UPDATE users SET ? WHERE id = ?';

    // ทำการอัปเดตข้อมูลในฐานข้อมูล
    conn.query(sql, [updatedUserData, userId], function (err, results) {
        if (err) {
            res.status(500).json({ status: 'error', message: err.message });
        } else {
            res.status(200).json({ status: 'ok', message: 'User updated successfully' });
        }
    });
});


app.delete('/api/deleteUser/:id', function (req, res, next) {
    const userId = req.params.id;
    conn.execute(
        'DELETE FROM users WHERE id=?',
        [userId],
        function (err, results, fields) {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json({ status: 'ok' });
        }
    );
});



app.listen(89, function () {
    console.log('CORS-enabled web server listening on port 89');
});
