document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registroForm");
  if (form) {
    form.addEventListener("submit", handleRegistro);
  }
});

export async function handleRegistro(event) {
  event.preventDefault();

  const usuario = document.getElementById("usuario").value;
  const correo = document.getElementById("email").value;
  const contrasena = document.getElementById("contrasena").value;
  const confirmarContrasena = document.getElementById(
    "contrasena_confirmada"
  ).value;

  if (contrasena !== confirmarContrasena) {
    Swal.fire({
      icon: "warning",
      title: "Las contraseñas no coinciden. Por favor, intente nuevamente.",
      allowOutsideClick: false,
    });
    return;
  }

  const checkEmailResponse = await fetch("/api/verificar-correo", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ correo }),
  });

  

  try {
    const responseEmail = await fetch("/api/verificar-correo", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ correo }),
    });

    const response = await fetch("/api/registrar", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ usuario, correo, contrasena }),
    });

    const checkEmailData = await responseEmail.json();

    // ?
    if (!responseEmail.ok) {
      throw new Error(checkEmailData.mensaje || "Error al verificar el correo");
    }

    if (checkEmailData.existe) {
      Swal.fire({
        icon: "error",
        title: "El correo ya está registrado",
        text: "Por favor, utilice otro correo electrónico.",
        allowOutsideClick: false,
      });
      return;
    }

    const data = await response.json();

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Registro exitoso, redirigiendo...",
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
        window.location.href = "../HTML/login.html";
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error al momento de registrarse.",
        text: `${data.mensaje}`,
        // esto es pa q no se pueda quitar la alerta si lepicas afuera de la misam
        allowOutsideClick: false,
      });
    }
  } catch (error) {
    console.error("Error durante el proceso de registrarse.", error);
    Swal.fire({
      icon: "error",
      title: "Error al registrarse. Por favor, intente nuevamente.",
      text: `${error}`,
      allowOutsideClick: false,
    });
  }
}
