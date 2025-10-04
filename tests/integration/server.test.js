const request = require('supertest');
const { app, server } = require('../../src/index');

describe('Testes de Integração do Servidor', () => {
  afterAll((done) => {
    server.close(done);
  });
  it('GET / deve retornar status 200 e a mensagem correta', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Olá, Prateleira de Jogos!');
  });
});
