const resultsTable = document.getElementById('resultsTable');
const resultsTableBody = resultsTable.querySelector('tbody');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');

document
  .getElementById('searchHistoricButton')
  .addEventListener('click', function () {
    clearErrors();
    showAllErrorsForm();

    const userIdField = document.getElementById('userId').value;
    const startDateField = document.getElementById('startDate').value;
    const endDateField = document.getElementById('endDate').value;

    const userIdEncoded = encodeURIComponent(userIdField);
    const startDateEncoded = encodeURIComponent(startDateField);
    const endDateEncoded = encodeURIComponent(endDateField);

    const url = `${API_URL_USERS_HISTORIC}?userId=${userIdEncoded}&startDate=${startDateEncoded}&endDate=${endDateEncoded}`;

    fetch(url, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          errorMessage.textContent =
            'Nenhum registro encontrado para os periodos que você especificou.';
          errorMessage.classList.remove('hidden');
          return;
        }

        populateTable(data);
      })
      .catch((error) => {
        errorMessage.textContent =
          'Erro ao consultar o histórico. A API pode estar fora do ar.';
        errorMessage.classList.remove('hidden');
        console.error('Error:', error);
      });
  });
