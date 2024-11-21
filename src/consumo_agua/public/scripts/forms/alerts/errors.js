const ERRORS_CLASSES = [
  'bg-red-100',
  'text-red-700',
  'border',
  'border-red-200',
];

const SUCCESS_CLASSES = [
  'bg-green-100',
  'text-green-700',
  'border',
  'border-green-200',
];

/**
 * Mostra mensagens de erro de requisições à API no formulário de alertas
 * @param {Error} error - Objeto de erro
 */
function showMessageErrorsAPI(error) {
  alertMessage.textContent =
    error.message || 'Erro inesperado. Tente novamente.';
  alertMessage.classList.remove('hidden');
  alertMessage.classList.add(...ERRORS_CLASSES);
}

/**
 * Reseta as mensagens de alerta anteriores
 */
function resetOlderMessages() {
  alertMessage.textContent = '';
  alertMessage.classList.add('hidden');
  alertMessage.classList.remove(...SUCCESS_CLASSES);
}
