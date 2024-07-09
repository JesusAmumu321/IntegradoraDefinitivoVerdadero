import { handleRegistro } from './registrar.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registroForm');
    form.addEventListener('submit', async (e) => {
        //e.preventDefault();
        const nombreUser = document.getElementById("usuario").value;
        const correo = document.getElementById("email").value;
        const contra1 = document.getElementById("contrasena").value;
        const contra2 = document.getElementById("contrasena_confirmada").value;

        if (contra1 !== contra2) {
            alert("Las contraseñas no coinciden, reintentelo");
            return;
        }
        try {
            await handleRegistro(nombreUser, correo, contra1);
            alert("Usuario registrado con éxito");
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            alert("Hubo un error al registrar el usuario");
        }
    });
});