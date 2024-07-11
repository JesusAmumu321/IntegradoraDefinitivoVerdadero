async function handleLogin(event) {
  event.preventDefault();

  const correo = document.getElementById("correo").value;
  const contrasena = document.getElementById("contrasena").value;

  try {
    console.log("iniciando solicitud para el inico");
    const response = await fetch("/api/iniciar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correo, contrasena }),
    });

    
    console.log("Respuesta recibida:", response);
    const data = await response.json();
    // && data.autenticado

    // lo de arriba se puede poner para asegurarse mejor de q las credenciales son correctas

    if (response.ok) {
      console.log("Autenticación exitosa, mostrando alerta");
      Swal.fire({
        icon: "success",
        title: "Inicio de sesión exitoso, redirigiendo...",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => { // el then es para q despues de q se haga el if, se hace esto, es para q salga la alerta bn
        window.location.href = "../HTML/agregarMed.html";
      });

    } else {
      Swal.fire({
        icon: "error",
        title: "Error al inicio de sesión",
        text: `Motivo del error: ${data.mensaje}`,
      });
    }

  } catch (error) {
    console.error("Error durante el proceso de inicio de sesión.", error);
    Swal.fire({
      icon: "error",
      title: "Error al inicio de sesión. Por favor, intente nuevamente.",
      text: `Motivo del error: ${error}`,
    });
  }
}
// Para depurar posibles errores
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (form) {
    console.log("Formulario encontrado, agregando evento submit");
    form.addEventListener("submit", handleLogin);
  } else {
    console.error("No se encontró el formulario con ID 'loginForm'");
  }
});
