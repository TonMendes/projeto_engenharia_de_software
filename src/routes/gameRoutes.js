const express = require('express');
const router = express.Router();
const GameController = require('../controllers/gameController');

router.get('/', GameController.getAllGames);
router.post('/', GameController.createGame);
router.get('/:id', GameController.getGameById);
router.put('/:id', GameController.updateGame);
router.delete('/:id', GameController.deleteGame);

module.exports = router;
