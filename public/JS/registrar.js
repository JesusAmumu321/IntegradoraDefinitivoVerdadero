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
    alert("las contraseñas no coinciden");
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

    if (response.ok) {
      console.log("registro exitoso");
      window.location.href = "../HTML/login.html"; // redirigir a la página de login
    } else {
      const data = await response.json();
      alert(`error en el registro: ${data.message}`);
    }
  } catch (error) {
    console.error("error:", error);
    alert("error en el registro. por favor, intente nuevamente.");
  }
}
