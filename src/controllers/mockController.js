class MockController {
  static mockGameData = {
    nome: "Cyberpunk 2077",
    desenvolvedor: "CD PROJEKT RED",
    anoLancamento: 2020,
    imagemCapa: "https://images.wallpapersden.com/image/download/background-of-cyberpunk-2077_bGVtZWiUmZqaraWkpJRmbmdlrWZlbWU.jpg"
  };

  static searchGame(req, res) {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({
        message: 'Parâmetro de busca "q" é obrigatório'
      });
    }

    if (query.toLowerCase() === 'cyberpunk 2077') {
      return res.status(200).json(MockController.mockGameData);
    }

    res.status(404).json({
      message: 'Jogo não encontrado no serviço mockado.'
    });
  }
}

module.exports = MockController;
