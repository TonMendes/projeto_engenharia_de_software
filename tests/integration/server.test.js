const request = require('supertest');
const { app, server } = require('../../src/index');
describe('Testes de Integração do Servidor', () => {
  it('GET / deve retornar status 200 e a página inicial', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Prateleira de Jogos');
    expect(response.text).toContain('<!DOCTYPE html>');
  });
});
