const express = require("express")
const server = express()
const routes = require("./routes")

// habilitar arquivos statics
// adicionar configurações ao servidor, não configurar rotas
server.use(express.static("public"))

// routes
server.use(routes)


// Estabeleceu a conexão do servidor na porta 3000
server.listen(3000, () => console.log('rodando'))