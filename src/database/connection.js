// Realizando a conexão no banco de dados

var knex =  require ('knex')({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'm1ca33p2s2iJP!',
        database: 'ecoleta'
    }
});

module.exports = knex