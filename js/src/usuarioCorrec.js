document.getElementById("iniciar").addEventListener("submit", async function (e) {
    e.preventDefault();

    const correo = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password })
    });

    const data = await response.json();

    if (response.ok) {
        alert("Bienvenido " + data.usuario.nombre);
        window.location.href = "index.html"; // Redirige a la siguiente página
    } else {
        alert(data.message);
    }
});
