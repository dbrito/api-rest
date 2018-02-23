const mysql = require('mysql'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    Connection = require('./utils/connection'),
    AutorRouter = require('./routes/AutorRouter');
    // NotaRouter = require('./routes/NotaRouter');

//Adiciono os middlewares que permitiram a leitura do post no servidor
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

async function startServer() {
    var conn = await (new Connection()).getConnection();
    //Tenho que adicionar o header para permitir o acesso via ajax
    app.use('*', (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        next();
    });

    (new AutorRouter(app, conn));

    app.listen(8080, function () {
        console.log('De pé  ( ͡° ͜ʖ ͡°)');
    })
}

startServer();
