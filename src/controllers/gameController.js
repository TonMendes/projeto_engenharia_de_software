const Game = require('../models/game');
const db = require('../database/inMemoryDb');

class GameController {
  static getAllGames(req, res) {
    res.status(200).json(db.games);
  }

  static getGameById(req, res) {
    const game = db.games.find(g => g.id === parseInt(req.params.id));

    if (!game) {
      return res.status(404).json({ message: 'Jogo não encontrado.' });
    }

    res.status(200).json(game);
  }

  static createGame(req, res) {
    const { nome, desenvolvedor, anoLancamento, plataforma, status, imagemCapa } = req.body;

    const validation = Game.validate({ nome, plataforma, status });
    if (!validation.isValid) {
      return res.status(400).json({
        message: 'Erro de validação',
        errors: validation.errors
      });
    }

    const newGame = new Game({
      id: db.nextGameId++,
      nome,
      desenvolvedor,
      anoLancamento,
      plataforma,
      status,
      imagemCapa
    });

    db.games.push(newGame);
    res.status(201).json(newGame);
  }

  static updateGame(req, res) {
    const gameIndex = db.games.findIndex(g => g.id === parseInt(req.params.id));

    if (gameIndex === -1) {
      return res.status(404).json({ message: 'Jogo não encontrado.' });
    }

    const { nome, desenvolvedor, anoLancamento, plataforma, status, imagemCapa } = req.body;

    const validation = Game.validate({ nome, plataforma, status });
    if (!validation.isValid) {
      return res.status(400).json({
        message: 'Erro de validação',
        errors: validation.errors
      });
    }

    const updatedGame = new Game({
      id: db.games[gameIndex].id,
      nome,
      desenvolvedor,
      anoLancamento,
      plataforma,
      status,
      imagemCapa
    });

    db.games[gameIndex] = updatedGame;
    res.status(200).json(updatedGame);
  }

  static deleteGame(req, res) {
    const gameIndex = db.games.findIndex(g => g.id === parseInt(req.params.id));

    if (gameIndex === -1) {
      return res.status(404).json({ message: 'Jogo não encontrado.' });
    }

    db.games.splice(gameIndex, 1);
    res.status(204).send();
  }
}

module.exports = GameController;
