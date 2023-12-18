// IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const contatoController = require('./controllers/contatoController');

//CONTROLLERS
router.post('/api/formcontato', contatoController.enviaContato);

// EXPORTS 
module.exports = router;
