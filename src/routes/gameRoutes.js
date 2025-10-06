const express = require('express');
const router = express.Router();
const db = require('../database/inMemoryDb');

router.get('/', (req, res) => {
  res.status(200).json(db.games);
});

router.post('/', (req, res) => {
  const { nome, desenvolvedor, anoLancamento, plataforma, status, imagemCapa } = req.body;

  if (!nome || !plataforma || !status) {
    return res.status(400).json({ message: 'Nome, plataforma e status são obrigatórios.' });
  }

  const newGame = {
    id: db.nextGameId++,
    nome,
    desenvolvedor,
    anoLancamento,
    plataforma,
    status,
    imagemCapa,
  };

  db.games.push(newGame);
  res.status(201).json(newGame);
});

router.get('/:id', (req, res) => {
  const game = db.games.find(g => g.id === parseInt(req.params.id));
  if (!game) {
    return res.status(404).json({ message: 'Jogo não encontrado.' });
  }
  res.status(200).json(game);
});

router.put('/:id', (req, res) => {
  const gameIndex = db.games.findIndex(g => g.id === parseInt(req.params.id));
  if (gameIndex === -1) {
    return res.status(404).json({ message: 'Jogo não encontrado.' });
  }

  const { nome, desenvolvedor, anoLancamento, plataforma, status, imagemCapa } = req.body;
  if (!nome || !plataforma || !status) {
    return res.status(400).json({ message: 'Nome, plataforma e status são obrigatórios.' });
  }

  const updatedGame = {
    ...db.games[gameIndex],
    nome,
    desenvolvedor,
    anoLancamento,
    plataforma,
    status,
    imagemCapa,
  };

  db.games[gameIndex] = updatedGame;
  res.status(200).json(updatedGame);
});

router.delete('/:id', (req, res) => {
  const gameIndex = db.games.findIndex(g => g.id === parseInt(req.params.id));
  if (gameIndex === -1) {
    return res.status(404).json({ message: 'Jogo não encontrado.' });
  }

  db.games.splice(gameIndex, 1);
  res.status(204).send();
});

module.exports = router;