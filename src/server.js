const express = require("express")
const server = express()
const routes = require("./routes")

// Usando template engine
server.set("view engine", 'ejs')

// habilitar arquivos statics
// adicionar configurações ao servidor, não configurar rotas
server.use(express.static("public"))

// Usar o req.body 
server.use(express.urlencoded({ extended: true }))

// habilitar routes que vem do export.modules no routes.js
server.use(routes)

// Estabeleceu a conexão do servidor na porta 3000
server.listen(3000, () => console.log('rodando'))