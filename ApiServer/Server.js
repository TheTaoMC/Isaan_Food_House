require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
// get the client
//const mysql = require('mysql2');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');


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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/users', function (req, res, next) {
    conn.query(
        'SELECT * FROM users',
        function (err, results, fields) {
            console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
            res.json(results)
        }
    );
});

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
});

app.get('/products/:name', function (req, res, next) {
    const name = req.params.name
    // simple query
    conn.query(
        'SELECT * FROM products where name like ?', '%' + [name] + '%',
        function (err, results, fields) {
            console.log(results); // results contains rows returned by server
            //console.log(fields); // fields contains extra meta data about results, if available
            res.json(results)
        }
    );
});


// กำหนดเส้นทางสำหรับ API Login ของคุณ
app.post('/login', async (req, res) => {
    // รับข้อมูลจากผู้ใช้
    const username = req.body.username;
    const password = req.body.password;

    // ตรวจสอบว่าผู้ใช้มีอยู่หรือไม่
    const sql = 'SELECT * FROM users WHERE username = ?';
    const results = await conn.query(sql, [username]);
    const user = results.length > 0 ? results[0] : null;

    // ตรวจสอบว่ารหัสผ่านถูกต้องหรือไม่
    if (user && bcrypt.compareSync(password, user.password)) {
        // สร้าง token
        const token = bcrypt.hashSync(username + Date.now(), 10);

        // บันทึก token ลงในฐานข้อมูล
        const sql = 'UPDATE users SET token = ? WHERE id = ?';
        await conn.query(sql, [token, user.id]);

        // ส่ง token กลับไปให้ผู้ใช้
        res.status(200).json({
            status: 'ok',
            message: 'Logged in',
            accessToken: token,
            expiresIn: 60000,
            user: user
        });
    } else {
        // ส่งข้อผิดพลาดกลับไปให้ผู้ใช้
        res.status(401).json({
            status: 'error',
            message: 'Login failed'
        });
    }
});


app.listen(89, function () {
    console.log('CORS-enabled web server listening on port 89');
});