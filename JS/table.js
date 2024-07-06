document.addEventListener('DOMContentLoaded', function() {
  const myTablona = [
{
  'medicamento': 'Paracetamol',
  'caducidad': '07/2024',
  'cantidad': '10',
  'dosis': '1 tableta',
  'proximo': 'Jueves',
  'fin': '30/05'
},
{
  'medicamento': 'Ibuprofeno',
  'caducidad': '12/2024',
  'cantidad': '20',
  'dosis': '2 tabletas',
  'proximo': 'Viernes',
  'fin': '15/06'
},
{
  'medicamento': 'Ibuprofeno',
  'caducidad': '12/2024',
  'cantidad': '20',
  'dosis': '2 tabletas',
  'proximo': 'Viernes',
  'fin': '15/06'
},{
  'medicamento': 'Ibuprofeno',
  'caducidad': '12/2024',
  'cantidad': '20',
  'dosis': '2 tabletas',
  'proximo': 'Viernes',
  'fin': '15/06'
},{
  'medicamento': 'Ibuprofeno2',
  'caducidad': '12/2024',
  'cantidad': '20',
  'dosis': '2 tabletas',
  'proximo': 'Viernes',
  'fin': '15/06'
},
{
  'medicamento': 'Ibuprofeno2',
  'caducidad': '12/2024',
  'cantidad': '20',
  'dosis': '2 tabletas',
  'proximo': 'Viernes',
  'fin': '15/06'
},
{
  'medicamento': 'Ibuprofeno2',
  'caducidad': '12/2024',
  'cantidad': '20',
  'dosis': '2 tabletas',
  'proximo': 'Viernes',
  'fin': '15/06'
},
{
  'medicamento': 'Ibuprofeno2',
  'caducidad': '12/2024',
  'cantidad': '20',
  'dosis': '2 tabletas',
  'proximo': 'Viernes',
  'fin': '15/06'
},
{
  'medicamento': 'Ibuprofeno2',
  'caducidad': '12/2024',
  'cantidad': '20',
  'dosis': '2 tabletas',
  'proximo': 'Viernes',
  'fin': '15/06'
},
{
  'medicamento': 'Ibuprofeno2',
  'caducidad': '12/2024',
  'cantidad': '20',
  'dosis': '2 tabletas',
  'proximo': 'Viernes',
  'fin': '15/06'
},
{
  'medicamento': 'Ibuprofeno2',
  'caducidad': '12/2024',
  'cantidad': '20',
  'dosis': '2 tabletas',
  'proximo': 'Viernes',
  'fin': '15/06'
},{
  'medicamento': 'Ibuprofeno2',
  'caducidad': '12/2024',
  'cantidad': '20',
  'dosis': '2 tabletas',
  'proximo': 'Viernes',
  'fin': '15/06'
},
{
  'medicamento': 'Ibuprofeno2',
  'caducidad': '12/2024',
  'cantidad': '20',
  'dosis': '2 tabletas',
  'proximo': 'Viernes',
  'fin': '15/06'
},
{
  'medicamento': 'Ibuprofeno2',
  'caducidad': '12/2024',
  'cantidad': '20',
  'dosis': '2 tabletas',
  'proximo': 'Viernes',
  'fin': '15/06'
}
// Puedes seguir añadiendo más objetos aquí
];

  function buildTable(data) {
      const table = document.getElementById('laTablona');
      for (let i = 0; i < data.length; i++) {
          const row = `<tr class="bg-gray-200 text-2xl">
              <td class="border border-gray-300 p-4 align-center text">${data[i].medicamento}</td>
              <td class="border border-gray-300 p-4 align-center">${data[i].caducidad}</td>
              <td class="border border-gray-300 p-4 align-center">${data[i].cantidad}</td>
              <td class="border border-gray-300 p-4 align-center">${data[i].dosis}</td>
              <td class="border border-gray-300 p-4 align-center">${data[i].proximo}</td>
              <td class="border border-gray-300 p-4 align-center">${data[i].fin}</td>
          </tr>`;
          table.innerHTML += row;
      }
  }

  buildTable(myTablona);
});