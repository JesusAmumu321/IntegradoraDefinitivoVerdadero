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

  // seleccionar inputs
  const inputsNumeroPositivo = document.querySelectorAll(
    "input.numero-positivo"
  );

  // validar para solo nums positivos
  inputsNumeroPositivo.forEach((input) => {
    input.addEventListener("input", function () {
      let value = this.value.trim();
      let numValue = parseFloat(value);

      if (value === "" || isNaN(numValue) || numValue <= 0) {
        this.value = "";
      } else {
        // si el input usa enteros, se usa Math.flooe
        // si el input permite decimales, ps se comento lo de this.value
        this.value = Math.floor(numValue);
      }
    });
  });

  tipoMedicamento.addEventListener("change", function () {
    if (this.value === "ml") {
      cantidadDosisLabel.innerHTML =
        'Cantidad de mililitros por dosis: <span class="text-red-500">*</span>';
      cantidadDosisInput.placeholder = "Ej. 5.";
      cantidadUnaCajaLabel.innerHTML =
        'Cantidad de mililitros por frasco: <span class="text-red-500">*</span>';
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
          generarEventosAutomaticosParaMedicamento(medicamento);

          Swal.fire({
            icon: "success",
            title: "Se agregó el medicamento de manera correcta.",
            allowOutsideClick: false,
          });
          // limpiar formulario
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

function generarEventosAutomaticosParaMedicamento(medicamento) {
  const titulo = medicamento.nombreMed;
  const intervaloHoras = parseInt(medicamento.frecuenciaToma);
  const fechaFin = medicamento.ultimaToma;
  generarEventosAutomaticos(titulo, intervaloHoras, fechaFin);
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
  inicializarFormularioMedicamentos();
});
