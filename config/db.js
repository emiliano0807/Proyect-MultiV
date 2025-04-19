// /config/db.js
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "UsuarioRegistro",
});

db.connect((err) => {
    if (err) {
        console.error("Error conectando a la base de datos:", err);
        return;
    }
    console.log("Conexión exitosa a la base de datos.");
});

module.exports = db;
