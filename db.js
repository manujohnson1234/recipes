const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'recipebookdb',
    password: '2323',
    port: 5432,
});

module.exports = pool;