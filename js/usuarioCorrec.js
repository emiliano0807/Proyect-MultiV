document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario

    const usuario = document.getElementById('usuario').value;
    const contraseña = document.getElementById('contraseña').value;
    const errorDiv = document.getElementById('error');

    const USUARIO_CORRECTO = "usuario123";
    const CONTRASEÑA_CORRECTA = "contraseña123";

    if (usuario === USUARIO_CORRECTO && contraseña === CONTRASEÑA_CORRECTA) {
        // Redirigir a otra página si el inicio de sesión es correcto
        window.location.href = "pagina_protegida.html";
    } else {
        // Mostrar un mensaje de error si el inicio de sesión falla
        errorDiv.textContent = "Usuario o contraseña incorrectos.";
    }
});
