document.addEventListener('DOMContentLoaded', function() {
  function calcularProximaToma(frecuenciaToma, ultimaToma) {
      const horaActual = new Date();
      const ultimaTomaDate = new Date(ultimaToma);
  
      function ajustarHora(hora, minutos) {
          let fecha = new Date(horaActual);
          fecha.setHours(hora, minutos, 0, 0);
          if (fecha <= horaActual) {
              fecha.setDate(fecha.getDate() + 1);
          }
          return fecha;
      }
      function calcularPaUnaHora() {
          let horaActualHora = horaActual.getHours();
          if (horaActualHora >= 22 || horaActualHora < 7) {
              return ajustarHora(7, 0);
          } else {
              return ajustarHora(horaActualHora + 1, 0);
          }
      }
  
      function calcularIntervalo(inicio, fin, tomas) {
          const intervalo = (fin - inicio) / (tomas - 1);
          let horas = [];
          for (let i = 0; i < tomas; i++) {
              horas.push(Math.round(inicio + i * intervalo));
          }
          return horas;
      }
  
      function encontrarProximaToma(horas) {
          let proximaHora = horas.find(h => h > horaActual.getHours());
          return proximaHora ? ajustarHora(proximaHora, 0) : ajustarHora(horas[0], 0);
      }
  
      let proximaToma;
  
      switch(frecuenciaToma) {
          case 1:
              proximaToma = calcularPaUnaHora();            
              break;
          case 2:
              proximaToma = encontrarProximaToma([8, 22]);
              break;
          case 3:
              proximaToma = encontrarProximaToma(calcularIntervalo(7, 23, 3));
              break;
          case 4:
              proximaToma = encontrarProximaToma(calcularIntervalo(7, 23, 4));
              break;
          case 5:
              proximaToma = encontrarProximaToma([7, 12, 17]);
              break;
          case 6:
              proximaToma = encontrarProximaToma([7, 13, 19]);
              break;
          case 8:
              proximaToma = encontrarProximaToma([7, 14, 22]);
              break;
          case 9:
              proximaToma = encontrarProximaToma([7, 14.5, 23]);
              break;
          case 10:
          case 11:
          case 12:
          case 13:
              proximaToma = encontrarProximaToma([7, 17]);
              break;
          case 14:
          case 15:
          case 16:
          case 17:
          case 18:
          case 19:
          case 20:
          case 21:
          case 22:
          case 23:
              proximaToma = encontrarProximaToma(calcularIntervalo(7, 22, frecuenciaToma));
              break;
          case 24:
              proximaToma = ajustarHora(7, 0);
              break;
          default:
              proximaToma = new Date(horaActual);
              break;
      }
  
      return proximaToma.toLocaleTimeString('es-ES', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false
      });
  }

  function buildTable(data) {
    const table = document.getElementById('laTablona');
    for (let i = 0; i < data.length; i++) {
        const proximaToma = calcularProximaToma(data[i].frecuentaToma, data[i].ultimaToma);
        const row = `<tr class="bg-gray-200 text-2xl">
            <td class="border border-gray-300 p-4 align-center text">${data[i].nombreMed}</td>
            <td class="border border-gray-300 p-4 align-center">${new Date(data[i].caducidadMed).toLocaleDateString('es-ES')}</td>
            <td class="border border-gray-300 p-4 align-center">${data[i].cantidadUnaCaja}</td>
            <td class="border border-gray-300 p-4 align-center">${data[i].cantidadDosis}</td>
            <td class="border border-gray-300 p-4 align-center">${proximaToma}</td>
            <td class="border border-gray-300 p-4 align-center">${new Date(data[i].ultimaToma).toLocaleDateString('es-ES')}</td>
        </tr>`;
        table.innerHTML += row;
    }
  }

  fetch('http://localhost:3000/getMedicamentos')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      buildTable(data);
    })
    .catch(error => {
      console.error('Error:', error);
      alert(`Error al obtener los datos: ${error.message}`);
    });
});
