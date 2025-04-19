// /controllers/authController.js
const bcrypt = require("bcrypt");
const db = require("../config/db");

// Registro de usuario
exports.registerUser = async (req, res) => {
    const { nombre, apellidos, domicilio, telefono, correo, password } = req.body;

    if (!nombre || !apellidos || !telefono || !correo || !password) {
        return res.status(400).send("Todos los campos obligatorios deben estar llenos.");
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

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
};

// Login de usuario
exports.loginUser = async (req, res) => {
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
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Correo o contraseña incorrectos" });
        }

        res.status(200).json({ success: true, message: "Inicio de sesión exitoso", usuario: user });
    });
};
