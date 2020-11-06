const Sequelize = require('sequelize');

const host = process.env.HOST;
const database = process.env.DB;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const port = process.env.DB_PORT;

module.exports = new Sequelize(database, username, password, {
    dialect: 'postgres',
    protocol: 'postgres',
    port: port,
    host: host,
    logging: true,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // <<<<<<< YOU NEED THIS
        }
    }
});
