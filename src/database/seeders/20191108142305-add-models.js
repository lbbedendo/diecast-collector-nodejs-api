"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Models", [
      {
        name: "911 GT3 RS",
        year: 2016,
        scale: "1:64",
        automakerId: 2,
        brandId: 1,
        serieId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        name: "Corolla AE86 Sprinter Trueno",
        year: 1986,
        scale: "1:64",
        automakerId: 1,
        brandId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete("Models", null, {});
  }
};
