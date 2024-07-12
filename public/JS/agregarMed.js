// aleman.js
document.addEventListener('DOMContentLoaded', function() {
    const tipoMedicamento = document.getElementById('tipo_medicamento');
    const cantidadDosisDiv = document.getElementById('cantidadDosis').parentNode;
    const cantidadUnaCajaDiv = document.getElementById('cantidadUnaCaja').parentNode;

    tipoMedicamento.addEventListener('change', function() {
      if (this.value === 'pastillas') {
        cantidadDosisDiv.innerHTML = `
          <label class="mb-1 text-m font-medium">
            Cantidad de pastillas por dosis <span class="text-red-500">*</span>
          </label>
          <input type="number" name="cantidadDosis" id="cantidadDosis" required placeholder="Ej. 1."
            class="w-full px-1.5 h-12 py-2 text-base md:text-l border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition duration-300 ease-in-out transform hover:scale-105">
        `;
        cantidadUnaCajaDiv.innerHTML = `
          <label class="mb-1 text-m font-medium">
            Cantidad de pastillas que contiene 1 caja. <span class="text-red-500">*</span>
          </label>
          <input type="number" name="cantidadUnaCaja" id="cantidadUnaCaja" required placeholder="Ej. 30."
            class="w-full px-1.5 h-12 py-2 text-base md:text-l border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition duration-300 ease-in-out transform hover:scale-105">
        `;
      } else if (this.value === 'ml') {
        cantidadDosisDiv.innerHTML = `
          <label class="mb-1 text-m font-medium">
            Cantidad de mililitros por dosis <span class="text-red-500">*</span>
          </label>
          <input type="number" name="cantidadDosis" id="cantidadDosis" required placeholder="Ej. 5."
            class="w-full px-1.5 h-12 py-2 text-base md:text-l border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition duration-300 ease-in-out transform hover:scale-105">
        `;
        cantidadUnaCajaDiv.innerHTML = `
          <label class="mb-1 text-m font-medium">
            Cantidad de mililitros que contiene 1 frasco. <span class="text-red-500">*</span>
          </label>
          <input type="number" name="cantidadUnaCaja" id="cantidadUnaCaja" required placeholder="Ej. 100."
            class="w-full px-1.5 h-12 py-2 text-base md:text-l border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition duration-300 ease-in-out transform hover:scale-105">
        `;
      }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('envioMedicamento').addEventListener('click', function(event) {
      event.preventDefault();
  
      const medicamento = {
        tipo_medicamento: document.getElementById('tipo_medicamento').value,
        nombreMed: document.getElementById('nombreMed').value,
        cantidadUnaCaja: document.getElementById('cantidadUnaCaja').value,
        cantidadCajas: document.getElementById('cantidadCajas').value,
        caducidadMed: document.getElementById('caducidadMed').value,
        ultimaToma: document.getElementById('ultimaToma').value,
        cantidadDosis :document.getElementById('cantidadDosis').value,
        frecuentaToma :document.getElementById('frecuenciaToma').value
      };
  
      fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(medicamento)
      })
      .then(response => response.text())
      .then(data => {
        alert(data); // Mostrar una alerta con la respuesta del servidor
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error al enviar los datos');
      });
    });
  });
  