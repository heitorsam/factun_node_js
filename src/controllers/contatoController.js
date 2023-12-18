// IMPORTAÇÕES
const sql = require('mssql');
const dbSqlServer = require('../config/dbSqlServer');

module.exports = {

    // ENVIANDO DADOS DO FORMULÁRIO CONTATO FACTUN
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

   // RECEBENDO DADOS DE ASSUNTO FORMULÁRIO CONTATO FACTUN
   async recebeAssunto(req, res) {

    // CONECTA AO BANCO
    try {
      await sql.connect(dbSqlServer);
  
    } catch (error) {
      console.error('Erro ao conectar no banco de dados:', error);
      res.status(500).json({ status: 'error', mensagem: 'Erro ao conectar no banco de dados.'});
    }
  
    // INSERINDO DADOS USANDO STORED PROCEDURE
    try {
      
      // EXECUTA A PROCEDURE DE ASSUNTO
      const result = await sql.query`EXEC [dbo].[USP_FAC_COMBO_FALECON_ASSUNTO]`;

      // ENVIA OS DADOS ENCONTRADOS COMO RESPSOTA
      res.json(result.recordset);
      //res.json({ status: 'success', mensagem: 'Dados recebidos com sucesso!' });
    
      console.log('Recebido com sucesso:', result);  
  
    } catch (error) {
      // EM CASO DE ERRO
      console.error('Erro ao inserir no banco de dados:', error);
      res.status(500).json({ status: 'error', mensagem: 'Erro ao realizar um select no banco de dados.' });
  
    } finally {
      // DESCONECTA DO BANCO
      await sql.close();
    }
  },

}