const express = require('express');
const app = express();
const port = 8080
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');

connection
    .authenticate()
    .then(() => {
        console.log('Conexão estabelecida');
    })
    .catch((msgErro) =>{
        console.log(msgErro);
    })

app.set('view engine', 'ejs');
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//Criando as rotas
app.get("/", (req, res) =>{
    Pergunta.findAll({ raw: true, order:[
        ['id', 'DESC']
    ]}).then(perguntas=>{
        res.render("index", {
            perguntas: perguntas
        });
    });
    
});
app.get('/perguntar', (req, res)=>{
    res.render('perguntar');
})

app.get('/responder/:id', (req, res)=>{
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta=>{
        if(pergunta != undefined){ // pergunta encontrada
            Resposta.findAll({
                where: {idPergunta: pergunta.id},
                order: [
                    ['id', 'DESC']
                ]
            }).then(respostas => {
                res.render('resposta',{
                    pergunta: pergunta,
                    respostas: respostas
                });
            })

        }else{ // pergunta não encontrada
            res.redirect('/');
        }
    });
});

//recebendo os dados de um formulário
app.post('/recebedados', (req, res)=>{
    var usuario = req.body.nomePergunta;
    var titulo = req.body.tituloPergunta;
    var descricao = req.body.descricaoPergunta;
    Pergunta.create({
        usuario: usuario,
        titulo: titulo,
        descricao: descricao,
    }).then(() =>{
        res.redirect('/');
    });
    
});
app.post('/salvaresposta', (req, res)=>{
    var usuario = req.body.nomeResposta;
    var resposta = req.body.resposta;
    var idPergunta = req.body.id;
    Resposta.create({
        usuario: usuario,
        resposta: resposta,
        idPergunta: idPergunta,
    }).then(()=>{
        res.redirect('/');
    });
});

//start
app.listen(port,()=>{
    console.log('app rodando');
});
