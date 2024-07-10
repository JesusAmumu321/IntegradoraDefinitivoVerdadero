document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (form) {
    form.addEventListener("submit", handleLogin);
  }
});

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

    if (response.ok && data.autenticado) {
      alert("Inicio de sesión exitoso");
      window.location.href = "../HTML/agregarMed.html";
    } else {
      alert(`Error en el inicio de sesión: ${data.mensaje}`);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error en el inicio de sesión. Por favor, intente nuevamente.");
  }
}
