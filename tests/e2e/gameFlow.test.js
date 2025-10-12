const request = require('supertest');
const { app } = require('../../src/index');
const db = require('../../src/database/inMemoryDb');

describe('Testes E2E - Fluxo Completo de Jogos', () => {
  beforeEach(() => {
    db.games = [];
    db.nextGameId = 1;
  });

  it('deve completar o fluxo: buscar na API mockada, criar, visualizar, atualizar e deletar um jogo', async () => {
    const mockApiResponse = await request(app)
      .get('/api/mock/games/search?q=Cyberpunk%202077');

    expect(mockApiResponse.status).toBe(200);
    expect(mockApiResponse.body.nome).toBe('Cyberpunk 2077');

    const createResponse = await request(app)
      .post('/api/games')
      .send({
        nome: mockApiResponse.body.nome,
        desenvolvedor: mockApiResponse.body.desenvolvedor,
        anoLancamento: mockApiResponse.body.anoLancamento,
        plataforma: 'PC',
        status: 'Jogando',
        imagemCapa: mockApiResponse.body.imagemCapa
      });

    expect(createResponse.status).toBe(201);
    expect(createResponse.body.id).toBe(1);
    const gameId = createResponse.body.id;

    const getResponse = await request(app).get(`/api/games/${gameId}`);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.nome).toBe('Cyberpunk 2077');
    expect(getResponse.body.status).toBe('Jogando');

    const updateResponse = await request(app)
      .put(`/api/games/${gameId}`)
      .send({
        nome: 'Cyberpunk 2077',
        desenvolvedor: 'CD PROJEKT RED',
        anoLancamento: 2020,
        plataforma: 'PC',
        status: 'Finalizado',
        imagemCapa: mockApiResponse.body.imagemCapa
      });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.status).toBe('Finalizado');

    const deleteResponse = await request(app).delete(`/api/games/${gameId}`);
    expect(deleteResponse.status).toBe(204);

    const verifyDelete = await request(app).get(`/api/games/${gameId}`);
    expect(verifyDelete.status).toBe(404);
  });

  it('deve gerenciar múltiplos jogos e filtrar por status', async () => {
    const game1 = await request(app).post('/api/games').send({
      nome: 'The Witcher 3',
      plataforma: 'PC',
      status: 'Finalizado'
    });

    const game2 = await request(app).post('/api/games').send({
      nome: 'Elden Ring',
      plataforma: 'PS5',
      status: 'Jogando'
    });

    const game3 = await request(app).post('/api/games').send({
      nome: 'Red Dead Redemption 2',
      plataforma: 'Xbox',
      status: 'Backlog'
    });

    expect(game1.status).toBe(201);
    expect(game2.status).toBe(201);
    expect(game3.status).toBe(201);

    const allGames = await request(app).get('/api/games');
    expect(allGames.status).toBe(200);
    expect(allGames.body).toHaveLength(3);

    const jogando = allGames.body.filter(g => g.status === 'Jogando');
    const finalizado = allGames.body.filter(g => g.status === 'Finalizado');
    const backlog = allGames.body.filter(g => g.status === 'Backlog');

    expect(jogando).toHaveLength(1);
    expect(finalizado).toHaveLength(1);
    expect(backlog).toHaveLength(1);
  });

  it('deve validar dados obrigatórios no fluxo de criação', async () => {
    const invalidGame = await request(app).post('/api/games').send({
      nome: 'Jogo Sem Status'
    });

    expect(invalidGame.status).toBe(400);
    expect(invalidGame.body.message).toContain('obrigatórios');

    const validGame = await request(app).post('/api/games').send({
      nome: 'Jogo Completo',
      plataforma: 'PC',
      status: 'Jogando'
    });

    expect(validGame.status).toBe(201);
  });

  it('deve simular fluxo do usuário navegando pelas páginas', async () => {
    const homePage = await request(app).get('/');
    expect(homePage.status).toBe(200);
    expect(homePage.text).toContain('Prateleira de Jogos');

    await request(app).post('/api/games').send({
      nome: 'Dark Souls',
      plataforma: 'PC',
      status: 'Jogando'
    });

    const gamesPage = await request(app).get('/');
    expect(gamesPage.status).toBe(200);

    const apiGames = await request(app).get('/api/games');
    expect(apiGames.body).toHaveLength(1);
    expect(apiGames.body[0].nome).toBe('Dark Souls');
  });
});
