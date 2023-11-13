//IMPORTACOES
const express = require('express');
const router = express.Router();

//ROTA COM PARAMETRO
router.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Visualizando perfil do usuário ${userId}`);
});

//ROTA COM FORMULARIO
router.post('/submit', (req, res) => {
  const formData = req.body;
  res.send('Dados do formulário recebidos com sucesso!');
});

//EXPORTS 
module.exports = router;