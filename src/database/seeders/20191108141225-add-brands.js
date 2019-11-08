"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Brands", [
      {
        name: "Hot Wheels",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        name: "Jada Toys",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        name: "Maisto",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Brands", null, {});
  }
};
