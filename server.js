const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt"); // Agregamos bcrypt para manejar contraseñas

const app = express();
const port = 3000;

// Configurar CORS para permitir solicitudes del frontend
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de la base de datos
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "UsuarioRegistro",
});

// Conectar a MySQL
db.connect((err) => {
    if (err) {
        console.error("Error conectando a la base de datos:", err);
        return;
    }
    console.log("Conexión exitosa a la base de datos.");
});

// Ruta para registrar usuarios (con contraseña cifrada)
app.post("/registrar", async (req, res) => {
    const { nombre, apellidos, domicilio, telefono, correo, password } = req.body;

    if (!nombre || !apellidos || !telefono || !correo || !password) {
        return res.status(400).send("Todos los campos obligatorios deben estar llenos.");
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Cifra la contraseña

        const query = "INSERT INTO usuarios (nombre, apellidos, domicilio, telefono, correo, password) VALUES (?, ?, ?, ?, ?, ?)";
        
        db.query(query, [nombre, apellidos, domicilio, telefono, correo, hashedPassword], (err, result) => {
            if (err) {
                console.error("Error al insertar datos:", err);
                return res.status(500).send("Error al registrar los datos");
            }
            res.status(200).send("Registro exitoso");
        });
    } catch (error) {
        res.status(500).send("Error en el servidor");
    }
});

// Ruta para obtener usuarios
app.get("/usuarios", (req, res) => {
    const query = "SELECT * FROM usuarios";

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error al obtener datos:", err);
            return res.status(500).send("Error al obtener los datos");
        }
        res.status(200).json(results);
    });
});

// Ruta para iniciar sesión
app.post("/login", (req, res) => {
    const { correo, password } = req.body;

    const query = "SELECT * FROM usuarios WHERE correo = ?";
    db.query(query, [correo], async (err, results) => {
        if (err) {
            console.error("Error en la consulta:", err);
            return res.status(500).json({ message: "Error interno del servidor" });
        }

        if (results.length === 0) {
            return res.status(401).json({ success: false, message: "Correo o contraseña incorrectos" });
        }

        const user = results[0];

        // Comparar la contraseña ingresada con la almacenada en la base de datos
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Correo o contraseña incorrectos" });
        }

        res.status(200).json({ success: true, message: "Inicio de sesión exitoso", usuario: user });
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
app.post("/registrar", async (req, res) => {
    const { nombre, apellidos, domicilio, telefono, correo, password } = req.body;

    if (!nombre || !apellidos || !telefono || !correo || !password) {
        return res.status(400).send("Todos los campos obligatorios deben estar llenos.");
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Cifra la contraseña

        const query = "INSERT INTO usuarios (nombre, apellidos, domicilio, telefono, correo, password) VALUES (?, ?, ?, ?, ?, ?)";
        
        db.query(query, [nombre, apellidos, domicilio, telefono, correo, hashedPassword], (err, result) => {
            if (err) {
                console.error("Error al insertar datos:", err);
                return res.status(500).send("Error al registrar los datos");
            }
            res.status(200).send("Registro exitoso");
        });
    } catch (error) {
        res.status(500).send("Error en el servidor");
    }
});
