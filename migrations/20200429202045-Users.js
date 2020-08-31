'use strict';

// subclasses of NUMBER are BIGINT, MEDIUMINT, SMALLINT, TINYINT
// additional datatypes, https://sequelize.org/master/class/lib/data-types.js~INTEGER.html
module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.createTable('users', { 
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true
      },
      email:{
        type: Sequelize.STRING(64),
        unique: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(32),
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING(32),
        allowNull: false
      },
      age: {
        type:Sequelize.TINYINT(3),
        allowNull: false
      },
      created: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      updated: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('users');
  }
};
