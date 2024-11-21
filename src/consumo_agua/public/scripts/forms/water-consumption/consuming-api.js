/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Cria um novo registro de consumo de água.
 * @param {Object} payload Dados do formulário.
 */
async function createConsumingWater(payload) {
  try {
    // Substitua pela URL da sua API
    const response = await fetch(API_URL_WATER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    validateWaterResponse(response);
  } catch (error) {
    console.error('Erro ao conectar com a API:', error);
  }
}

/**
 * Valida a resposta da API de consumo de água.
 * @param {Object} response Resposta da API.
 */
function validateWaterResponse(response) {
  if (response.ok) {
    alert('Consumo registrado com sucesso!');
    form.reset();
  } else {
    alert('Erro ao registrar consumo. Tente novamente.');
  }
}
