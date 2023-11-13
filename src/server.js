//IMPORTACOES
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

//CRIA ARQUIVO DE LOG
const logFile = fs.createWriteStream('log.txt', { flags: 'a' });

// MIDDLEWARE FORMULARIO HTML
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//IMPORTA ROTAS
const routes = require('./routes');
app.use('/', routes);

//ROTA PADRAO
app.get('/', (req, res) => {
  res.send('Bem-vindo à página inicial!');
});

//ROTA ERRO 404
app.use((req, res) => {
  res.status(404).send('Página não encontrada');
});

//INICIA SERVIDOR NA PORTA 8099
const PORT = 8099;
app.listen(PORT, () => {
  console.log('Iniciado server na porta: ${PORT}');
});

//EXPORTS
module.exports = app;