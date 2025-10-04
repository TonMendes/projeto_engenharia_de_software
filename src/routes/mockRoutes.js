const express = require('express');
const router = express.Router();
const mockGameData = {
  nome: "Cyberpunk 2077",
  desenvolvedor: "CD PROJEKT RED",
  anoLancamento: 2020,
  imagemCapa: "https://cdn.example.com/cyberpunk2077_cover.jpg"
};
router.get('/search', (req, res) => {
  const query = req.query.q;
  if (query && query.toLowerCase() === 'cyberpunk 2077') {
    res.status(200).json(mockGameData);
  } else {
    res.status(404).json({ message: 'Jogo não encontrado no serviço mockado.' });
  }
});
module.exports = router;
