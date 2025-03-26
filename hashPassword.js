const bcrypt = require("bcrypt");

const passwordPlano = "tu_contraseña"; // Cambia por la contraseña que quieras cifrar
bcrypt.hash(passwordPlano, 10, (err, hash) => {
    if (err) throw err;
    console.log("Contraseña cifrada:", hash);
});
