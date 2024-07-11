async function handleLogin(event) {
  event.preventDefault();

  const correo = document.getElementById("correo").value;
  const contrasena = document.getElementById("contrasena").value;

  try {
    const response = await fetch("/api/iniciar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correo, contrasena }),
    });

    const data = await response.json();

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Inicio de sesión exitoso, redirigiendo...",
        showConfirmButton: false,
        timer: 1500,
        /*
        Estos tres de abajo sirven para que no se pueda hacer clic afuera de la alerta
        para quitarla, al igual q en con el escape o con el enter y ya
        */
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
      }).then(() => {
        window.location.href = "../HTML/agregarMed.html";
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error al inicio de sesión",
        text: `Motivo del error: ${data.mensaje}`,
        // esto es pa q no se pueda quitar la alerta si lepicas afuera de la misam
        allowOutsideClick: false,
      });
    }
  } catch (error) {
    console.error("Error durante el proceso de inicio de sesión.", error);
    Swal.fire({
      icon: "error",
      title: "Error al inicio de sesión. Por favor, intente nuevamente.",
      text: `Motivo del error: ${error}`,
      allowOutsideClick: false,
    });
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (form) {
    form.addEventListener("submit", handleLogin);
  } else {
    console.error("No se encontró el formulario con ID 'loginForm'");
  }
});
