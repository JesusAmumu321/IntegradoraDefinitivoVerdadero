import { registrarUsuario } from './registrar.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registroForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombreUser = document.getElementById("usuario").value;
        const correoUser = document.getElementById("email").value;
        const contra1 = document.getElementById("contraseña").value;
        const contra2 = document.getElementById("contraseña_confirmada").value;

        if (contra1 !== contra2) {
            alert("Las contraseñas no coinciden, reintentelo");
            return;
        }

        try {
            await registrarUsuario(nombreUser, correoUser, contra1);
            alert("Usuario registrado con éxito");
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            alert("Hubo un error al registrar el usuario");
        }
    });
});