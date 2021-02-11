const mysql = require('mysql');

const db = mysql.createConnection({
    host: '172.18.0.4',
    user:'root',
    password : 'password',
    database : "todowork",
});


module.exports = db;