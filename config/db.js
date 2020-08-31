const Sequelize = require('sequelize');
const DATABASE = process.env.DATABASE
const USERNAME = process.env.USERNAME
const PASSWORD = process.env.PASSWORD
const HOST = process.env.HOST
const DIALECT = process.env.DIALECT

module.exports = new Sequelize(DATABASE, USERNAME, PASSWORD, {
    host: HOST,
    dialect: DIALECT,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})
