const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('id');
const isEditMode = !!gameId;

if (isEditMode) {
    document.getElementById('form-title').textContent = 'Editar Jogo';
    loadGameData();
}

async function loadGameData() {
    try {
        const response = await fetch(`/api/games/${gameId}`);
        if (!response.ok) throw new Error('Jogo não encontrado');

        const game = await response.json();

        document.getElementById('nome').value = game.nome || '';
        document.getElementById('desenvolvedor').value = game.desenvolvedor || '';
        document.getElementById('anoLancamento').value = game.anoLancamento || '';
        document.getElementById('plataforma').value = game.plataforma || '';
        document.getElementById('status').value = game.status || '';
        document.getElementById('imagemCapa').value = game.imagemCapa || '';
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao carregar dados do jogo');
        window.location.href = '/';
    }
}

async function searchGame() {
    const searchInput = document.getElementById('search-game');
    const query = searchInput.value.trim();
    const messageDiv = document.getElementById('search-message');

    if (!query) {
        messageDiv.innerHTML = '<p class="error-message">Digite o nome de um jogo para buscar</p>';
        return;
    }

    try {
        messageDiv.innerHTML = '<p class="info-message">Buscando...</p>';

        const response = await fetch(`/api/mock/games/search?q=${encodeURIComponent(query)}`);

        if (response.status === 404) {
            messageDiv.innerHTML = '<p class="error-message">Jogo não encontrado na base de dados</p>';
            return;
        }

        if (!response.ok) throw new Error('Erro na busca');

        const gameData = await response.json();

        document.getElementById('nome').value = gameData.nome || '';
        document.getElementById('desenvolvedor').value = gameData.desenvolvedor || '';
        document.getElementById('anoLancamento').value = gameData.anoLancamento || '';
        document.getElementById('imagemCapa').value = gameData.imagemCapa || '';

        messageDiv.innerHTML = '<p class="success-message">Jogo encontrado! Dados preenchidos automaticamente.</p>';

        setTimeout(() => {
            messageDiv.innerHTML = '';
        }, 3000);
    } catch (error) {
        console.error('Erro:', error);
        messageDiv.innerHTML = '<p class="error-message">Erro ao buscar jogo</p>';
    }
}

document.getElementById('game-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        nome: document.getElementById('nome').value,
        desenvolvedor: document.getElementById('desenvolvedor').value,
        anoLancamento: parseInt(document.getElementById('anoLancamento').value) || undefined,
        plataforma: document.getElementById('plataforma').value,
        status: document.getElementById('status').value,
        imagemCapa: document.getElementById('imagemCapa').value
    };

    try {
        const url = isEditMode ? `/api/games/${gameId}` : '/api/games';
        const method = isEditMode ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao salvar jogo');
        }

        window.location.href = '/';
    } catch (error) {
        console.error('Erro:', error);
        alert(`Erro ao salvar jogo: ${error.message}`);
    }
});
