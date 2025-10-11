const express = require('express');
const path = require('path');
const mockRoutes = require('./routes/mockRoutes');
const gameRoutes = require('./routes/gameRoutes');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/mock/games', mockRoutes);
app.use('/api/games', gameRoutes);

let server;

if (process.env.NODE_ENV !== 'test') {
  server = app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
}

module.exports = { app, server };
