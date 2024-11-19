/**
 * Função responsável por criar um usuário.
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('user-creation-form');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const { name, email } = captureFormInformations();

    clearErrors();
    const isValid = showAllErrorsForm(name, email);

    if (!isValid) return;

    const payload = {
      name,
      email,
    };
    createUser(payload);
  });
});

/**
 * Captura os dados do formulário.
 * @returns {Object} Retorna um objeto com os dados do formulário.
 */
function captureFormInformations() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();

  return {
    name,
    email,
  };
}
