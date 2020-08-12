//Servidor
const express = require('express')
const server = express()

const {pageLanding, pageStudy, pageGiveClasses, saveClasses} = require('./pages')

const nunjucks = require('nunjucks')

//Configurar Nunjucks

nunjucks.configure("src/views", {
    express: server,
    noCache: true,
})

//Inicio e configuração do servidor
server
//receber os dados do req.body
.use(express.urlencoded({extended: true}))
//Configurar arquivoc estaticos
.use(express.static("public"))

//rotas da aplicação
.get("/", pageLanding)

.get("/study", pageStudy)

.get("/give-classes", pageGiveClasses)

.post("/save-classes", saveClasses)

.listen(5000)