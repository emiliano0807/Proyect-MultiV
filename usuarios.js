document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("http://localhost:3000/usuarios");
        const usuarios = await response.json();

        const tablaUsuarios = document.getElementById("tablaUsuarios");

        usuarios.forEach(usuario => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${usuario.id}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.apellidos}</td>
                <td>${usuario.domicilio}</td>
                <td>${usuario.telefono}</td>
                <td>${usuario.correo}</td>
            `;
            tablaUsuarios.appendChild(fila);
        });

    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        Swal.fire("Error", "No se pudieron cargar los usuarios", "error");
    }
});
