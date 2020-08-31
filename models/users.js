const Sequelize = require('sequelize');
const db = require('../config/db');
const UUIDV4 = require('uuid/v4'); // ES5

// read up on model definitions
// https://sequelize.readthedocs.io/en/2.0/docs/models-definition/

const Users = db.define('users', {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    },
    name: {
        type:Sequelize.STRING,
        allowNull: false,
        validat: {
            is: ["^[a-z]+$",'i']
        }
    },
    lastName: {
        type:Sequelize.STRING,
        allowNull: false,
        is: ["^[a-z]+$",'i']
    },
    age: {
        type:Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
        }
    },
    created:{
        type:Sequelize.INTEGER,
        allowNull:false,
        validate: {
            isInt: true,
        }
    },
    updated:{
        type:Sequelize.INTEGER,
        allowNull:false,
        validate: {
            isInt: true,
        }
    }
}, {
    timestamps: false
})

// Users.beforeCreate(user => user.id = uuid());

module.exports = Users