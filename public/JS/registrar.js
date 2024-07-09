document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registroForm");
  if (form) {
    form.addEventListener("submit", handleRegistro);
  }
});

export async function handleRegistro() {

  const usuario = document.getElementById("usuario").value;
  const correo = document.getElementById("email").value;
  const contrasena = document.getElementById("contrasena").value;
  const confirmarContrasena = document.getElementById(
    "contrasena_confirmada"
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
      body: JSON.stringify({ usuario, correo, contrasena })
    });

    const data = await response.json();

    if (response.ok) {

      console.log("Registro exitoso");

      window.location.href = "../HTML/login.html"; // redirigir a login si si jala el pedo

    } else {
        alert(`Error en el registro: ${data.message}`);
    }
  } catch (error) {

    console.error("Error:", error);

    alert("Error en el registro. Por favor, intente nuevamente.");

  }
}
