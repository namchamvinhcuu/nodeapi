const { Sequelize } = require('sequelize');
require('dotenv').config();

const mssql = require('mssql')

const config = {
    driver: process.env.SQL_DRIVER,
    server: process.env.SQL_SERVER,
    port: parseInt(process.env.SQL_PORT, 10),
    database: process.env.SQL_DATABASE,
    user: process.env.SQL_UID,
    password: process.env.SQL_PWD,
    options: {
        encrypt: false,
        enableArithAbort: false
    },
};
// const pool = new mssql.ConnectionPool(config);

// // Option 1: Passing a connection URI
// const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres

// // Option 2: Passing parameters separately (sqlite)
// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: 'path/to/database.sqlite'
// });

// // Option 3: Passing parameters separately (other dialects)
// const sequelize = new Sequelize('database', 'username', 'password', {
//     host: 'localhost',
//     dialect: /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
// });

const mySQLSequelize = new Sequelize('nodedemo', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

const MSSQLSequelize = new Sequelize('NodeDemo', 'sa', "YFemGoN1mCoYP7hrfUY5Re5z1YIe0hVG2R76R4pj5O7k2YQnM3", {
    host: '118.69.130.73',
    port: 1435,
    dialect: 'mssql',
    logging: false,
});

const connectMySQLDB = async () => {
    try {
        await mySQLSequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

const connectMSSQLDB = async () => {
    try {
        // await pool.connect();
        await MSSQLSequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = {
    connectMySQLDB: connectMySQLDB,
    connectMSSQLDB: connectMSSQLDB,
    // pool: pool,
};