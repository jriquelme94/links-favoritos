// Requiero Mysql para conectarme a mi Bd y el objeto "database" de mi archivo keys.js con los datos de conexión. 
const mysql = require('mysql');
// Requiero el módulo "promisify" para soportar async-await.
const { promisify } = require('util');
// ¡¡¡ CAMIBAR VALORES DE keys.js EN PROD !!! */
const { database } = require('./keys');

// Creo un pool para que mi app use hilos que ejecuten código en paralelo.
const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    } else if (connection) {
        connection.release();
        console.log('DB is Connected :D');
    }
});

// Creo una promesa para poder realizar consultas.
pool.query = promisify(pool.query);

// Exporto pool para empezar a hacer las consultas a la BD.
module.exports = pool;