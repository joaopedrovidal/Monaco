// Realizando a conexão no banco de dados

var knex =  require ('knex')({
    client: '',
    connection: {
        host: '',
        user: '',
        password: '',
        database: ''
    }
});

module.exports = knex