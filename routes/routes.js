const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const controller = require('../controllers/index')
const middlawares = require('../middlewares/index.js')

const session = require('express-session')
const sessionStorage = require('../util/sessionStorage.js')

router.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
    secret: 'alura', //Assinar a sessão
    resave: false, //Indica se a sessão deve ser salva no armazenamento, mesmo que não tenha sido moficado durante a solicitação 
    saveUninitialized: false,  //Indica se a sessão não inicializada deve ser salva no armazenamento
    // cookie: { secure: true }
    store: sessionStorage
  }))

router.get('/', controller.showIndex)
router.post('/', controller.login)
router.get('/signup', controller.showPageSignUp)
router.post('/signup', controller.signup)
router.get('/members', middlawares.checkAuth, controller.showMembersPage)
router.use(controller.get404Page)

module.exports = router
