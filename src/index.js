const express = require('express');
const mockRoutes = require('./routes/mockRoutes');
const gameRoutes = require('./routes/gameRoutes');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/mock/games', mockRoutes);
app.use('/api/games', gameRoutes);

app.get('/', (req, res) => {
  res.send('Olá, Prateleira de Jogos!');
});

const server = app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

module.exports = { app, server };
