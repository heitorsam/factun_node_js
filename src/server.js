//IMPORTA EXPRESS
const express = require('express');
const app =  express();

//IMPORTA FILE SISTEM
const fs = require('fs');
var logFile = fs.createWriteStream('log.txt', { flags: 'a' });
try{

  //IMPORTA ROTAS
  const routes = require ('./routes');

  //LIBERA ACESSO A COLETAR INFORMACOES DE FORMULARIO HTML
  var bodyParser = require('body-parser');
  app.use(bodyParser.urlencoded({
      extended: true
    })
  );
    
  //CONFIGURA FUNCIONALIDADES DO APP EXPRESS
  app.use(bodyParser.json());
  app.use(express.json());
  app.use(routes);

  //PORTA
  app.listen(8099);

}catch(err){

  //CRIA ARQUIVO DE LOG COM ERRO
  logFile.write(err);

}