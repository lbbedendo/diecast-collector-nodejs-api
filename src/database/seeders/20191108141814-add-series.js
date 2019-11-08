"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Series", [
      {
        name: "Factory Fresh",
        year: 2015,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        name: "Lendas Brasileiras do Automobilismo",
        year: 2014,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Series", null, {});
  }
};
