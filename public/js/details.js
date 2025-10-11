const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('id');

if (!gameId) {
    window.location.href = '/';
}

async function loadGameDetails() {
    const detailsDiv = document.getElementById('game-details');
    const loadingDiv = document.getElementById('loading');
    const errorDiv = document.getElementById('error');

    try {
        const response = await fetch(`/api/games/${gameId}`);

        if (response.status === 404) {
            throw new Error('Jogo não encontrado');
        }

        if (!response.ok) {
            throw new Error('Erro ao carregar detalhes do jogo');
        }

        const game = await response.json();

        loadingDiv.style.display = 'none';

        detailsDiv.innerHTML = `
            <div class="details-content">
                <div class="details-image">
                    ${game.imagemCapa
                        ? `<img src="${game.imagemCapa}" alt="${game.nome}">`
                        : '<div class="no-image-large">Sem Imagem</div>'}
                </div>
                <div class="details-info">
                    <h2>${game.nome}</h2>
                    <div class="info-row">
                        <span class="info-label">Status:</span>
                        <span class="game-status status-${game.status.toLowerCase()}">${game.status}</span>
                    </div>
                    ${game.desenvolvedor ? `
                        <div class="info-row">
                            <span class="info-label">Desenvolvedor:</span>
                            <span>${game.desenvolvedor}</span>
                        </div>
                    ` : ''}
                    ${game.anoLancamento ? `
                        <div class="info-row">
                            <span class="info-label">Ano de Lançamento:</span>
                            <span>${game.anoLancamento}</span>
                        </div>
                    ` : ''}
                    <div class="info-row">
                        <span class="info-label">Plataforma:</span>
                        <span>${game.plataforma}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">ID:</span>
                        <span>${game.id}</span>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        loadingDiv.style.display = 'none';
        errorDiv.textContent = error.message;
        errorDiv.style.display = 'block';

        setTimeout(() => {
            window.location.href = '/';
        }, 2000);
    }
}

function editGame() {
    window.location.href = `/form.html?id=${gameId}`;
}

async function deleteGame() {
    if (!confirm('Tem certeza que deseja excluir este jogo?')) return;

    try {
        const response = await fetch(`/api/games/${gameId}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Erro ao deletar jogo');

        window.location.href = '/';
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao deletar jogo');
    }
}

loadGameDetails();
