const Sequelize = require('sequelize');
const connection = require('./database');

//criando uma tabela com sequelize
var Resposta = connection.define('respostas',{
    usuario:{
        type: Sequelize.STRING,
        allowNull: false
    },
    resposta:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    idPergunta:{
        type: Sequelize.INTEGER,
        allowNull: false
    }

});

Resposta.sync({force: false}).then(() => {
    console.log('Tabela Resposta criada');
});

module.exports = Resposta; //exportando para uso 