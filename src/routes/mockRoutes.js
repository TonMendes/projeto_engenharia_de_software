const express = require('express');
const router = express.Router();
const MockController = require('../controllers/mockController');

router.get('/search', MockController.searchGame);

module.exports = router;
