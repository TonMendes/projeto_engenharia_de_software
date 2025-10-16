const request = require('supertest');
const { app, server } = require('../../src/index');

describe('Testes da API Mockada (/api/mock/games)', () => {
  it('GET /search deve retornar dados do jogo para "Cyberpunk 2077"', async () => {
    const response = await request(app)
      .get('/api/mock/games/search?q=Cyberpunk%202077');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('nome', 'Cyberpunk 2077');
    expect(response.body).toHaveProperty('desenvolvedor', 'CD PROJEKT RED');
  });

  it('GET /search deve retornar 404 para um jogo não mockado', async () => {
    const response = await request(app)
      .get('/api/mock/games/search?q=The%20Witcher%203');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Jogo não encontrado no serviço mockado.');
  });

  it('GET /search deve retornar 400 quando não informar query parameter', async () => {
    const response = await request(app)
      .get('/api/mock/games/search');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Parâmetro de busca "q" é obrigatório');
  });
});
