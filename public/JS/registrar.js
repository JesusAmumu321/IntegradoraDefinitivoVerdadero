document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registroForm");
  if (form) {
    form.addEventListener("submit", handleRegistro);
  }
});

export async function handleRegistro(event) {
  event.preventDefault(); // prevenir comportamiento predeterminado

  const usuario = document.getElementById("usuario").value;
  const correo = document.getElementById("email").value;
  const contrasena = document.getElementById("contrasena").value;
  const confirmarContrasena = document.getElementById(
    "contrasena_confirmada"
  ).value;

  if (contrasena !== confirmarContrasena) {
    console.error("Error durante el proceso de inicio de sesión.");
    Swal.fire({
      icon: "warning",
      title: "Las contraseñas no coinciden. Por favor, intente nuevamente."
    });
    return;
  }

  try {
    const response = await fetch("/api/registrar", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ usuario, correo, contrasena }),
    });

    console.log("Respuesta recibida:", response);
    const data = await response.json();
    console.log("Datos de respuesta:", data);
    console.log("registro exitoso");

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Registro exitoso, redirigiendo...",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        // el then es para q despues de q se haga el if, se hace esto, es para q salga la alerta bn
        window.location.href = "../HTML/login.html";
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error al momento de registrarse.",
        text: `Motivo del error: ${data.mensaje}`,
      });
    }
  } catch (error) {
    console.error("Error durante el proceso de registrarse.", error);
    Swal.fire({
      icon: "error",
      title: "Error al registrarse. Por favor, intente nuevamente.",
      text: `Motivo del error: ${error}`,
    });
  }
}
