const mysql = require('mysql');
const utils = require('util');


const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pokemon'
});


pool.query = utils.promisify(pool.query);
module.exports = pool;