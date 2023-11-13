//IMPORTA EXPRESS
const express = require('express');

//IMPORTA AS ROTAS DO EXPRESS
const routes = express.Router();

//ROTA (AQUI CRIA AS ROTAS PERSONALIZADAS)
routes.get('/boletos/pf/:matricula', PdfController.boletoPF);
routes.post('/boletos/pf', PdfController.boletoPFPost);

//EXPORTA PARA SER UTILIZADOS EM OUTROS ARQUIVOS
module.exports = routes;