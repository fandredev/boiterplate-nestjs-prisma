/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Popula a tabela com os dados
 * @param {Array} data - Array de objetos com os dados a serem exibidos na tabela
 */
function populateTable(data) {
  resultsTable.classList.remove('hidden');
  data.forEach((item) => {
    const row = document.createElement('tr');
    const formatDate = new Date(item.readingDate).toLocaleDateString();
    row.classList.add('border-b');

    row.innerHTML = `
            <td class="border border-gray-300 px-4 py-2">${formatDate}</td>
            <td class="border border-gray-300 px-4 py-2">${item.consumption}</td>
            <td class="border border-gray-300 px-4 py-2">${item.note || '-'}</td>
        `;
    resultsTableBody.appendChild(row);
  });
}
