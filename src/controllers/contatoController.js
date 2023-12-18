// IMPORTAÇÕES
const sql = require('mssql');
const dbSqlServer = require('../config/dbSqlServer');

module.exports = {

    // RECEBENDO DADOS DO FORMULÁRIO CONTATO FACTUN
    async enviaContato(req, res) {
    const dadosform = req.body;
    console.log('Dados recebidos:', dadosform);
    
    // CONECTA AO BANCO
    try {
      await sql.connect(dbSqlServer);
  
    } catch (error) {
      console.error('Erro ao conectar no banco de dados:', error);
      res.status(500).json({ status: 'error', mensagem: 'Erro ao conectar no banco de dados.'});
    }
  
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
  },

}