//IMPORTACOES
const express = require('express');
const router = express.Router();

//IMPORTACAO MYSQL2 QUE ACEITA PROMISES
const mysql = require('mysql2/promise'); 

//IMPORTACAO DB MYSQL
const dbMysql = require('./dbMysql');

//CRIANDO ASYNC MIDDLEWARE
const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

//RECEBENDO DADOS DO FORMULARIO CONTATO FACTUN
router.post('/api/formcontato', asyncMiddleware(async (req, res) => {

  const dadosform = req.body;
  console.log('Dados recebidos:', dadosform);

  //CONECTA AO BANCO
  const connection = await mysql.createConnection(dbMysql);

  //INSERINDO DADOS NO MYSQL
  try {

    const result = await connection.execute(
      'INSERT INTO FALE_CONOSCO (NOME, TELEFONE, EMAIL, ID_ASSUNTO, MENSAGEM) VALUES (?, ?, ?, ?, ?)',
      [dadosform.nome, dadosform.telefone, dadosform.email, dadosform.id_assunto, dadosform.mensagem]
    );

    console.log('Inserido com sucesso:', result);
    res.json({ status: 'success', mensagem: 'Dados inseridos com sucesso!' });

  } catch (error) {

    //EM CASO DE ERRO
    console.error('Erro ao inserir no banco de dados:', error);
    res.status(500).json({ status: 'error', mensagem: 'Erro ao inserir no banco de dados.' });

  }

   //DESCONECTA DO BANCO
   connection.end();

}));

//EXPORTS 
module.exports = router;