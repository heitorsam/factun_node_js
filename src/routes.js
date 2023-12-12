// IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const sql = require('mssql');

// IMPORTAÇÃO DB SQL SERVER
const dbSqlServer = require('./dbSqlServer');

// CRIANDO ASYNC MIDDLEWARE
const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// RECEBENDO DADOS DO FORMULÁRIO CONTATO FACTUN
router.post('/api/formcontato', asyncMiddleware(async (req, res) => {
  const dadosform = req.body;
  console.log('Dados recebidos:', dadosform);

  // CONECTA AO BANCO
  await sql.connect(dbSqlServer);

  // INSERINDO DADOS USANDO STORED PROCEDURE
  try {
    const result = await sql.query`
      EXEC USP_FAC_GRAVA_FALECONOSCO
        @S08_DsNome = ${dadosform.nome},
        @S08_DsEmail = ${dadosform.email},
        @S08_DsAssunto = ${dadosform.id_assunto},
        @S08_DsMsg = ${dadosform.mensagem},
        @Num_Telefone = ${dadosform.telefone}
    `;

    console.log('Inserido com sucesso:', result);
    res.json({ status: 'success', mensagem: 'Dados inseridos com sucesso!' });

  } catch (error) {
    // EM CASO DE ERRO
    console.error('Erro ao inserir no banco de dados:', error);
    res.status(500).json({ status: 'error', mensagem: 'Erro ao inserir no banco de dados.' });

  } finally {
    // DESCONECTA DO BANCO
    await sql.close();
  }
}));

// EXPORTS 
module.exports = router;
