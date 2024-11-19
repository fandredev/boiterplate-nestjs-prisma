/**
 * Exibe uma mensagem especifica de erro em um elemento do formulário.
 * @param {string} elementId ID do elemento onde a mensagem será exibida.
 * @param {string} message Mensagem de erro a ser exibida.
 */
function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
}

/**
 * Mostra todas as mensagens de erro no formulário.
 * @param {number} user ID do usuário.
 * @param {number} consumption Consumo de água.
 * @param {string} readingDate Data do consumo.
 * @returns {boolean} Retorna true se não houver erros no formulário.
 */
function showAllErrorsForm(user, consumption, readingDate) {
  let isValid = true;

  if (isNaN(user) || user <= 0) {
    showError("user-error", ERROR_FIELD_USER);
    isValid = false;
  }

  if (isNaN(consumption) || consumption <= 0) {
    showError("consumption-error", ERROR_FIELD_CONSUMPTION);
    isValid = false;
  }

  if (!readingDate) {
    showError("readingDateError", ERROR_FIELD_DATE);
    isValid = false;
  }

  return isValid;

}

/**
 * Limpa todas as mensagens de erro exibidas no formulário.
 */
function clearErrors() {

  const elementError = document.querySelectorAll(".text-red-500");

  elementError.forEach((element) => (element.textContent = ""));
}