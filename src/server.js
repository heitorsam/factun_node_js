//IMPORTACOES
const express = require('express');
const app = express();

//ARQUIVOS
const fs = require('fs');
const logFile = fs.createWriteStream('log.txt', { flags: 'a' });

//CROSS PLATAFORMAS
const cors = require('cors');
app.use(cors()); 

// MIDDLEWARE FORMULARIO HTML
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

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
  console.log('Iniciado server na porta: ' + PORT);
});

//EXPORTS
module.exports = app;