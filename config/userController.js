const db = require("../config/db");

// Obtener todos los usuarios
exports.getUsers = (req, res) => {
    const query = "SELECT * FROM usuarios";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error al obtener datos:", err);
            return res.status(500).send("Error al obtener los datos");
        }
        res.status(200).json(results);
    });
};

// Eliminar un usuario por ID
exports.deleteUser = (req, res) => {
    const { id } = req.params;

    const query = "DELETE FROM usuarios WHERE id = ?";
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error("Error al eliminar el usuario:", err);
            return res.status(500).json({ error: "Error al eliminar el usuario" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.status(200).json({ mensaje: "Usuario eliminado correctamente" });
    });
};
