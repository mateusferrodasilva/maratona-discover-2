const sqlite3 = require('sqlite3')
// chave importa apenas este método
const { open } = require('sqlite')

// open precisa ser colocado dentro de uma estrutura (){}
module.exports = () => open({
    filename: './database.sqlite',
    driver: sqlite3.Database
})
