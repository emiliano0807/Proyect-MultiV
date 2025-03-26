const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'UsuarioRegistro',
    port: '3306'
});

exports.connection = connection;