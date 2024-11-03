const express = require('express')
const routes = require('./routes/routes')
const mongoConnect = require('./util/database').mongoConnect
require("dotenv").config();

const app = express();
const port = 3000;

const session = require('express-session')
const sessionStorage = require('./util/sessionStorage')
app.use(session({
    secret: process.env.SECRET_SESSION, //Assinar a sessão
    resave: false, //Indica se a sessão deve ser salva no armazenamento, mesmo que não tenha sido moficado durante a solicitação 
    saveUninitialized: false,  //Indica se a sessão não inicializada deve ser salva no armazenamento
    // cookie: { secure: true }
    store: sessionStorage
  }))
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(routes);

mongoConnect(() => {
    app.listen(port)
})
