function inicializarFormularioMedicamentos() {
  const tipoMedicamento = document.getElementById("tipo_medicamento");
  const cantidadDosisLabel = document.querySelector(
    'label[for="cantidadDosis"]'
  );
  const cantidadDosisInput = document.getElementById("cantidadDosis");
  const cantidadUnaCajaLabel = document.querySelector(
    'label[for="cantidadUnaCaja"]'
  );
  const cantidadUnaCajaInput = document.getElementById("cantidadUnaCaja");

  tipoMedicamento.addEventListener("change", function () {
    if (this.value === "pastillas") {
      cantidadDosisLabel.innerHTML =
        'Cantidad de pastillas por dosis <span class="text-red-500">*</span>';
      cantidadDosisInput.placeholder = "Ej. 1.";
      cantidadUnaCajaLabel.innerHTML =
        'Cantidad de pastillas que contiene 1 caja. <span class="text-red-500">*</span>';
      cantidadUnaCajaInput.placeholder = "Ej. 30.";
    } else if (this.value === "ml") {
      cantidadDosisLabel.innerHTML =
        'Cantidad de mililitros por dosis <span class="text-red-500">*</span>';
      cantidadDosisInput.placeholder = "Ej. 5.";
      cantidadUnaCajaLabel.innerHTML =
        'Cantidad de mililitros que contiene 1 frasco. <span class="text-red-500">*</span>';
      cantidadUnaCajaInput.placeholder = "Ej. 100.";
    }
  });

  document
    .getElementById("envioMedicamento")
    .addEventListener("click", async function (e) {
      e.preventDefault();

      const medicamento = {
        tipo_medicamento: document.getElementById("tipo_medicamento").value,
        frecuenciaToma: document.getElementById("frecuenciaToma").value,
        nombreMed: document.getElementById("nombreMed").value,
        cantidadDosis: document.getElementById("cantidadDosis").value,
        cantidadUnaCaja: document.getElementById("cantidadUnaCaja").value,
        cantidadCajas: document.getElementById("cantidadCajas").value,
        caducidadMed: document.getElementById("caducidadMed").value,
        ultimaToma: document.getElementById("ultimaToma").value,
      };

      try {
        const response = await fetch("/api/agregar-medicamento", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(medicamento),
        });

        const data = await response.json();

        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "Se agregó el medicamento de manera correcta.",
            allowOutsideClick: false,
          });
          // Aquí puedes limpiar el formulario o redirigir a otra página
        } else {
          Swal.fire({
            icon: "error",
            title: "Error al agregar el medicamento.",
            allowOutsideClick: false,
          });
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Ocurrió un error, por favor, inténtelo de nuevo.",
          text: error.message,
          allowOutsideClick: false,
        });
      }
    });
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
  inicializarFormularioMedicamentos();
});
