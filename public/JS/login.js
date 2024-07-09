document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (form) {
    form.addEventListener("submit", handleLogin);
  }
});

async function handleLogin(event) {
  event.preventDefault();

  const correo = document.getElementById("email").value;
  const contrasena = document.getElementById("contraseña").value;

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correo, contrasena }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Inicio de sesión exitoso");
      // Aquí puedes redirigir al usuario a la página principal o dashboard
      window.location.href = "/dashboard.html";
    } else {
      alert(`Error en el inicio de sesión: ${data.message}`);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error en el inicio de sesión. Por favor, intente nuevamente.");
  }
}
