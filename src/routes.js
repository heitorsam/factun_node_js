// IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const contatoController = require('./controllers/contatoController');

//CONTROLLERS
router.post('/api/formcontato', contatoController.enviaContato);
router.get('/api/recebeassunto', contatoController.recebeAssunto);

// EXPORTS 
module.exports = router;
