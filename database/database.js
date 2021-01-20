const Sequelize  = require('sequelize');

const connection = new Sequelize('guia_perguntas', 'root', 'ad34f5h7', { //bando, usuario e senha
  host: '127.0.0.1', //servidor
  port: '3307', //porta
  dialect: 'mysql', //banco
});

module.exports = connection;