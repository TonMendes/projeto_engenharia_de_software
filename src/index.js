const express = require('express');
const mockRoutes = require('./routes/mockRoutes');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/mock/games', mockRoutes);

app.get('/', (req, res) => {
  res.send('Olá, Prateleira de Jogos!');
});

const server = app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

module.exports = { app, server };