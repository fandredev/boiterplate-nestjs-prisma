/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Mostra todas as mensagens de erro no formulário.
 */
function showAllErrorsForm() {
  if (!userId || !startDate || !endDate) {
    errorMessage.textContent = 'Por favor, preencha todos os campos.';
    errorMessage.classList.remove('hidden');
    return;
  }
  if (new Date(startDate) > new Date(endDate)) {
    errorMessage.textContent =
      'A data inicial não pode ser maior que a data final.';
    errorMessage.classList.remove('hidden');
    return;
  }
}

/**
 * Limpa todas as mensagens de erro exibidas no formulário.
 */

function clearErrors() {
  errorMessage.textContent = '';
  successMessage.textContent = '';
  resultsTableBody.innerHTML = '';
  resultsTable.classList.add('hidden');
  errorMessage.classList.add('hidden');
  successMessage.classList.add('hidden');
}
