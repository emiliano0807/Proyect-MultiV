const form = document.getElementById('loginForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const correo = document.getElementById('correo').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, password })
    });

    const result = await response.json();

    if (response.ok && result.success) {
      // Redirigir a index.html si las credenciales son correctas
      window.location.href = "Registros.html";
    } else {
      document.getElementById("error").innerText = result.message || "Correo o contraseña incorrectos";
    }
  } catch (error) {
    console.error("Error en la petición:", error);
    document.getElementById("error").innerText = "Error en el servidor";
  }
});