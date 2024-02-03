// IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const contatoController = require('./controllers/contatoController');
const pixController = require('./controllers/pixController');
const inscricaoController = require('./controllers/inscricaoController');

//CONTROLLERS CONTATO
router.post('/api/formcontato', contatoController.enviaContato);
router.get('/api/recebeassunto', contatoController.recebeAssunto);

//CONTROLLERS PIX
router.post('/api/emissaocobrancaqrcodepix', pixController.emissaoCobrancaQrCodePix);

//CONTROLLERS INSCRICAO (EM CONSTRUCAO)
router.get('/api/inscricao/recebecurso', inscricaoController.recebeCurso);

//router.post('/api/inscricao/???', inscricaoController.enviaContato);

// EXPORTS 
module.exports = router;
