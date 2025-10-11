let allGames = [];
let currentFilter = 'todos';

async function loadGames() {
    try {
        const response = await fetch('/api/games');
        if (!response.ok) throw new Error('Erro ao carregar jogos');

        allGames = await response.json();
        renderGames();
    } catch (error) {
        console.error('Erro:', error);
        showEmptyState();
    }
}

function renderGames() {
    const container = document.getElementById('games-container');
    const emptyState = document.getElementById('empty-state');

    const filteredGames = currentFilter === 'todos'
        ? allGames
        : allGames.filter(game => game.status === currentFilter);

    if (filteredGames.length === 0) {
        container.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    container.style.display = 'grid';
    emptyState.style.display = 'none';

    container.innerHTML = filteredGames.map(game => `
        <div class="game-card" data-id="${game.id}">
            <div class="game-image">
                ${game.imagemCapa
                    ? `<img src="${game.imagemCapa}" alt="${game.nome}">`
                    : '<div class="no-image">Sem Imagem</div>'}
            </div>
            <div class="game-info">
                <h3>${game.nome}</h3>
                <p class="game-platform">${game.plataforma}</p>
                <span class="game-status status-${game.status.toLowerCase()}">${game.status}</span>
            </div>
            <div class="game-actions">
                <button onclick="viewDetails(${game.id})" class="btn-view">Ver Detalhes</button>
                <button onclick="deleteGame(${game.id})" class="btn-delete">Excluir</button>
            </div>
        </div>
    `).join('');
}

function showEmptyState() {
    document.getElementById('games-container').style.display = 'none';
    document.getElementById('empty-state').style.display = 'block';
}

function viewDetails(id) {
    window.location.href = `/details.html?id=${id}`;
}

async function deleteGame(id) {
    if (!confirm('Tem certeza que deseja excluir este jogo?')) return;

    try {
        const response = await fetch(`/api/games/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Erro ao deletar jogo');

        await loadGames();
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao deletar jogo');
    }
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        currentFilter = btn.dataset.status;
        renderGames();
    });
});

loadGames();
