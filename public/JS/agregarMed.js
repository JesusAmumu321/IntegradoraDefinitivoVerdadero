function inicializarFormularioMedicamentos() {
  const tipoMedicamento = document.getElementById("tipo_medicamento");
  const cantidadDosisLabel = document.querySelector('label[for="cantidadDosis"]');
  const cantidadDosisInput = document.getElementById("cantidadDosis");
  const cantidadUnaCajaLabel = document.querySelector('label[for="cantidadUnaCaja"]');
  const cantidadUnaCajaInput = document.getElementById("cantidadUnaCaja");
  const cantidadCajasLabel = document.querySelector('label[for="cantidadCajas"]');
  const cantidadCajasInput = document.getElementById("cantidadCajas");

  tipoMedicamento.addEventListener("change", function () {
    if (this.value === "pastillas") {
      cantidadDosisLabel.innerHTML =
        'Cantidad de pastillas por dosis <span class="text-red-500">*</span>';
      cantidadDosisInput.placeholder = "Ej. 1.";
      cantidadUnaCajaLabel.innerHTML =
        'Cantidad de pastillas que contiene 1 caja. <span class="text-red-500">*</span>';
      cantidadUnaCajaInput.placeholder = "Ej. 30.";
      cantidadCajasLabel.innerHTML =
        'Cantidad de cajas que tiene. <span class="text-red-500">*</span>';
      cantidadCajasInput.placeholder = "Ej. 20.";

    } else if (this.value === "ml") {
      cantidadDosisLabel.innerHTML =
        'Cantidad de mililitros por dosis <span class="text-red-500">*</span>';
      cantidadDosisInput.placeholder = "Ej. 5.";
      cantidadUnaCajaLabel.innerHTML =
        'Cantidad de mililitros que contiene 1 frasco. <span class="text-red-500">*</span>';
      cantidadUnaCajaInput.placeholder = "Ej. 100.";
      cantidadCajasLabel.innerHTML =
        'Cantidad de frascos que tiene. <span class="text-red-500">*</span>';
      cantidadCajasInput.placeholder = "Ej. 20.";
    }
  });

  document.getElementById("envioMedicamento").addEventListener("click", async function (e) {
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

document.addEventListener("DOMContentLoaded", function () {
  inicializarFormularioMedicamentos();
});