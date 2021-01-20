const Sequelize = require('sequelize');
const connection = require('./database');

//criando uma tabela com sequelize
var Pergunta = connection.define('pergunta',{
    usuario:{
        type: Sequelize.STRING,
        allowNull: false
    },
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }

});

Pergunta.sync({force: false}).then(() => {
    console.log('Tabela Pergunta criada');
});

module.exports = Pergunta; //exportando para uso 