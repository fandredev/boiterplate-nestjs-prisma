/* eslint-disable @typescript-eslint/no-unused-vars */

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
 * @param {name} string Nome do usuário.
 * @param {number} email Email do usuário.
 * @returns {boolean} Retorna true se não houver erros no formulário.
 */

function showAllErrorsForm(name, email) {
  let isValid = true;

  // Apesar de ter required nos campos, é importante validar no JS
  if (!name) {
    showError('name-error', ERROR_FIELD_NAME);
    isValid = false;
  }

  if (!email || !validateEmail(email)) {
    showError('email-error', ERROR_FIELD_INVALID_EMAIL);
    isValid = false;
  }

  return isValid;
}

/**
 * Limpa todas as mensagens de erro exibidas no formulário.
 */
function clearErrors() {
  const elementError = document.querySelectorAll('.text-red-500');
  elementError.forEach((element) => (element.textContent = ''));
}

/**
 * Valida um email.
 * @param {string} email Email a ser validado.
 */
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
