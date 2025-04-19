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
                <td>
                    <button onclick="editarUsuario(${usuario.id})">Editar</button>
                    <button onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
                </td>
            `;
            tablaUsuarios.appendChild(fila);
        });

    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
    }
});

// FUNCIONES FUERA DEL DOMContentLoaded

function eliminarUsuario(id) {
    if (confirm("¿Estás seguro de eliminar este usuario?")) {
        fetch(`http://localhost:3000/usuarios/${id}`, {
            method: "DELETE"
        })
        .then(response => {
            if (!response.ok) throw new Error("Error al eliminar usuario");
            return response.json();
        })
        .then(() => {
            alert("Usuario eliminado correctamente");
            location.reload();
        })
        .catch(error => {
            console.error(error);
            alert("Error al eliminar el usuario");
        });
    }
}

function editarUsuario(id) {
    window.location.href = `editarUsuario.html?id=${id}`;
}
