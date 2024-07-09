document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registroForm");
  if (form) {
    form.addEventListener("submit", handleRegistro);
  }
});

async function handleRegistro(event) {
  event.preventDefault();

  const usuario = document.getElementById("usuario").value;
  const correo = document.getElementById("email").value;
  const contrasena = document.getElementById("contraseña").value;
  const confirmarContrasena = document.getElementById(
    "contraseña_confirmada"
  ).value;

  if (contrasena !== confirmarContrasena) {
    alert("Las contraseñas no coinciden");
    return;
  }

  try {
    const response = await fetch("/api/registrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usuario, correo, contrasena }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Registro exitoso");
      window.location.href = "/login.html"; // Redirigir a la página de login
    } else {
      alert(`Error en el registro: ${data.message}`);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error en el registro. Por favor, intente nuevamente.");
  }
}
