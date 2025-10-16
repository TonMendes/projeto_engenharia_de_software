const Game = require('../../src/models/game');

describe('Testes da Classe Game', () => {
  describe('Validacao', () => {
    it('deve validar um jogo com todos os dados corretos', () => {
      const validation = Game.validate({
        nome: 'The Witcher 3',
        plataforma: 'PC',
        status: 'Jogando'
      });

      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('deve retornar erro quando nome estiver vazio', () => {
      const validation = Game.validate({
        nome: '',
        plataforma: 'PC',
        status: 'Jogando'
      });

      expect(validation.isValid).toBe(false);
      expect(validation.errors.length).toBeGreaterThan(0);
    });

    it('deve retornar erro quando nome for apenas espacos', () => {
      const validation = Game.validate({
        nome: '   ',
        plataforma: 'PC',
        status: 'Jogando'
      });

      expect(validation.isValid).toBe(false);
      expect(validation.errors.length).toBeGreaterThan(0);
    });

    it('deve retornar erro quando plataforma estiver vazia', () => {
      const validation = Game.validate({
        nome: 'Dark Souls',
        plataforma: '',
        status: 'Jogando'
      });

      expect(validation.isValid).toBe(false);
      expect(validation.errors.length).toBeGreaterThan(0);
    });

    it('deve retornar erro quando plataforma for apenas espacos', () => {
      const validation = Game.validate({
        nome: 'Dark Souls',
        plataforma: '   ',
        status: 'Jogando'
      });

      expect(validation.isValid).toBe(false);
      expect(validation.errors.length).toBeGreaterThan(0);
    });

    it('deve retornar erro quando status estiver vazio', () => {
      const validation = Game.validate({
        nome: 'Elden Ring',
        plataforma: 'PS5',
        status: ''
      });

      expect(validation.isValid).toBe(false);
      expect(validation.errors.length).toBeGreaterThan(0);
    });

    it('deve retornar erro quando status for apenas espacos', () => {
      const validation = Game.validate({
        nome: 'Elden Ring',
        plataforma: 'PS5',
        status: '   '
      });

      expect(validation.isValid).toBe(false);
      expect(validation.errors.length).toBeGreaterThan(0);
    });

    it('deve retornar erro quando status for invalido', () => {
      const validation = Game.validate({
        nome: 'Elden Ring',
        plataforma: 'PS5',
        status: 'StatusInvalido'
      });

      expect(validation.isValid).toBe(false);
      expect(validation.errors.length).toBeGreaterThan(0);
    });

    it('deve aceitar status Jogando', () => {
      const validation = Game.validate({
        nome: 'Game',
        plataforma: 'PC',
        status: 'Jogando'
      });

      expect(validation.isValid).toBe(true);
    });

    it('deve aceitar status Finalizado', () => {
      const validation = Game.validate({
        nome: 'Game',
        plataforma: 'PC',
        status: 'Finalizado'
      });

      expect(validation.isValid).toBe(true);
    });

    it('deve aceitar status Backlog', () => {
      const validation = Game.validate({
        nome: 'Game',
        plataforma: 'PC',
        status: 'Backlog'
      });

      expect(validation.isValid).toBe(true);
    });

    it('deve retornar multiplos erros quando varios campos forem invalidos', () => {
      const validation = Game.validate({
        nome: '',
        plataforma: '',
        status: ''
      });

      expect(validation.isValid).toBe(false);
      expect(validation.errors.length).toBeGreaterThan(1);
    });
  });

  describe('Constructor', () => {
    it('deve criar um jogo com todos os campos', () => {
      const game = new Game({
        id: 1,
        nome: 'Cyberpunk 2077',
        desenvolvedor: 'CD PROJEKT RED',
        anoLancamento: 2020,
        plataforma: 'PC',
        status: 'Jogando',
        imagemCapa: 'https://example.com/image.jpg'
      });

      expect(game.id).toBe(1);
      expect(game.nome).toBe('Cyberpunk 2077');
      expect(game.desenvolvedor).toBe('CD PROJEKT RED');
      expect(game.anoLancamento).toBe(2020);
      expect(game.plataforma).toBe('PC');
      expect(game.status).toBe('Jogando');
      expect(game.imagemCapa).toBe('https://example.com/image.jpg');
    });

    it('deve criar um jogo com campos opcionais nulos', () => {
      const game = new Game({
        id: 1,
        nome: 'Dark Souls',
        plataforma: 'PC',
        status: 'Backlog'
      });

      expect(game.desenvolvedor).toBeNull();
      expect(game.anoLancamento).toBeNull();
      expect(game.imagemCapa).toBeNull();
    });
  });

  describe('toJSON', () => {
    it('deve retornar objeto JSON com todos os campos', () => {
      const game = new Game({
        id: 1,
        nome: 'Test Game',
        desenvolvedor: 'Test Dev',
        anoLancamento: 2023,
        plataforma: 'PC',
        status: 'Finalizado',
        imagemCapa: 'test.jpg'
      });

      const json = game.toJSON();

      expect(json).toEqual({
        id: 1,
        nome: 'Test Game',
        desenvolvedor: 'Test Dev',
        anoLancamento: 2023,
        plataforma: 'PC',
        status: 'Finalizado',
        imagemCapa: 'test.jpg'
      });
    });
  });
});
