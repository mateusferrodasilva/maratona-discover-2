const express = require("express")
const server = express()

// habilitar arquivos statics
// adicionar configurações ao servidor, não configurar rotas
server.use(express.static("public"))
// request, response
server.get('/', (request, response) => {
    return response.sendFile(__dirname + "/views/index.html")
})

// Estabeleceu a conexão do servidor na porta 3000
server.listen(3000, () => console.log('rodando'))