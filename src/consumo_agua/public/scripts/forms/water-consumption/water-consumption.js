const form = document.getElementById('water-consumption-form');

document.addEventListener('DOMContentLoaded', () => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const { user, consumption, readingDate } = captureFormInformations();

    clearErrors();
    const isValidForm = showAllErrorsForm(user, consumption, readingDate);

    if (isValidForm) {
      const payload = {
        user: parseInt(user, 10),
        consumption: parseFloat(consumption),
        readingDate: new Date(readingDate).toISOString(),
      };
      createConsumingWater(payload);
    }
  });
});

/**
 * Captura os dados do formulário.
 * @returns {Object} Retorna um objeto com os dados do formulário.
 */
function captureFormInformations() {
  const user = document.getElementById('user').value.trim();
  const consumption = document.getElementById('consumption').value.trim();
  const readingDate = document.getElementById('readingDate').value.trim();

  return {
    user,
    consumption,
    readingDate,
  };
}
