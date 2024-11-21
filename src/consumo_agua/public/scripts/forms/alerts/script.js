const takeFormFromDOM = document.getElementById('alertForm');

takeFormFromDOM.addEventListener('submit', async (event) => {
  event.preventDefault();

  const userId = document.getElementById('userId').value;
  const alertMessage = document.getElementById('alertMessage');

  resetOlderMessages();

  try {
    const response = await fetch(`${API_URL_WATER_ALERTS}?userId=${userId}`);

    if (!response.ok) {
      throw new Error(
        'Erro ao buscar o alerta. Verifique o código do usuário.',
      );
    }

    const data = await response.json();

    alertMessage.textContent = data.message;
    alertMessage.classList.remove('hidden');
    alertMessage.classList.add(
      'bg-green-100',
      'text-green-700',
      'border',
      'border-green-200',
    );
  } catch (error) {
    showMessageErrorsAPI(error);
  }
});
