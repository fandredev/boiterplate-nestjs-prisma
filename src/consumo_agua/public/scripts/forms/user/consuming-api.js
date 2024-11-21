/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Função para criar um usuário na API.
 * @param {Object} payload - Dados do formulário.
 */
async function createUser(payload) {
  try {
    const response = await fetch(API_URL_USERS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    validateUserResponse(response);
  } catch (error) {
    console.error('Erro ao conectar com a API:', error);
  }
}

/**
 * Valida a resposta da API de usuário.
 * @param {*} response - Resposta da API.
 */
function validateUserResponse(response) {
  if (response.ok) {
    alert('Usuário criado com sucesso!');
    form.reset();
  } else {
    alert(
      'Erro ao criar usuário. Esse e-mail provavelmente já está cadastrado.',
    );
  }
}
