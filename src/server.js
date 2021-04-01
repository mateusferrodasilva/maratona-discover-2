const express = require("express")
const server = express()

// request, response
server.get('/', (request, response) => {
    return response.send("")
})

// Estabeleceu a conexão do servidor na porta 3000
server.listen(3000, () => console.log('rodando'))