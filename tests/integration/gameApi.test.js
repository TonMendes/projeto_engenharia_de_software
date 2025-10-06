const request = require('supertest');
const { app } = require('../../src/index');
const db = require('../../src/database/inMemoryDb');

describe('Testes da API de Jogos (/api/games)', () => {
  let gameDeTeste;

  beforeEach(() => {
    db.games = [];
    db.nextGameId = 1;
    gameDeTeste = {
      id: db.nextGameId++,
      nome: 'Jogo Padrão',
      plataforma: 'PC',
      status: 'Jogando'
    };
    db.games.push(gameDeTeste);
  });

  describe('GET /', () => {
    it('deve retornar uma lista com um jogo', async () => {
      const response = await request(app).get('/api/games');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].nome).toBe(gameDeTeste.nome);
    });
  });

  describe('GET /:id', () => {
    it('deve retornar um jogo específico pelo ID', async () => {
      const response = await request(app).get(`/api/games/${gameDeTeste.id}`);
      expect(response.status).toBe(200);
      expect(response.body.nome).toBe(gameDeTeste.nome);
    });

    it('deve retornar 404 para um ID de jogo inexistente', async () => {
      const response = await request(app).get('/api/games/999');
      expect(response.status).toBe(404);
    });
  });

  describe('POST /', () => {
    it('deve criar um novo jogo com sucesso', async () => {
      const newGame = {
        nome: 'The Witcher 3: Wild Hunt',
        plataforma: 'PC',
        status: 'Finalizado',
        desenvolvedor: 'CD PROJEKT RED',
      };
      const response = await request(app).post('/api/games').send(newGame);
      expect(response.status).toBe(201);
      expect(response.body.nome).toBe(newGame.nome);
      expect(db.games).toHaveLength(2);
    });

    it('deve retornar erro 400 se campos obrigatórios estiverem faltando', async () => {
      const newGame = { nome: 'Jogo Incompleto' };
      const response = await request(app).post('/api/games').send(newGame);
      expect(response.status).toBe(400);
      expect(db.games).toHaveLength(1);
    });
  });

  describe('PUT /:id', () => {
    it('deve atualizar um jogo existente com sucesso', async () => {
      const updatedData = {
        nome: 'Jogo Padrão Atualizado',
        plataforma: 'PS5',
        status: 'Finalizado',
      };
      const response = await request(app).put(`/api/games/${gameDeTeste.id}`).send(updatedData);
      expect(response.status).toBe(200);
      expect(response.body.nome).toBe(updatedData.nome);
      expect(response.body.plataforma).toBe(updatedData.plataforma);
    });

    it('deve retornar 404 ao tentar atualizar um jogo inexistente', async () => {
      const response = await request(app).put('/api/games/999').send({ nome: 'a', plataforma: 'b', status: 'c' });
      expect(response.status).toBe(404);
    });

    it('deve retornar 400 ao tentar atualizar com dados inválidos', async () => {
        const response = await request(app).put(`/api/games/${gameDeTeste.id}`).send({ nome: 'Incompleto' });
        expect(response.status).toBe(400);
    });
  });

  describe('DELETE /:id', () => {
    it('deve deletar um jogo existente com sucesso', async () => {
      const response = await request(app).delete(`/api/games/${gameDeTeste.id}`);
      expect(response.status).toBe(204);
      expect(db.games).toHaveLength(0);
    });

    it('deve retornar 404 ao tentar deletar um jogo inexistente', async () => {
      const response = await request(app).delete('/api/games/999');
      expect(response.status).toBe(404);
      expect(db.games).toHaveLength(1);
    });
  });
});