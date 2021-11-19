const mysql = require('mysql');
require('dotenv').config()
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.NAME
});


db.connect((err) => {
    if (err) {
        console.log(err,'errr');
       
        
    }
    else {

        console.log('Connected to database');
    }
});

module.exports = db;