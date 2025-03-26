document.getElementById("enviar").addEventListener("click", async function () {
    const formData = {
        nombre: document.getElementById("nombre").value,
        apellidos: document.getElementById("apellido").value,
        domicilio: document.getElementById("domicilio").value,
        telefono: document.getElementById("telefono").value,
        correo: document.getElementById("email").value,
        password: document.getElementById("password").value // Cambiado a "password"
    };

    try {
        const response = await fetch("http://localhost:3000/registrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            Swal.fire("Éxito", "Usuario registrado correctamente", "success");
        } else {
            Swal.fire("Error", "No se pudo registrar el usuario", "error");
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        Swal.fire("Error", "Hubo un problema con el servidor", "error");
    }
});
