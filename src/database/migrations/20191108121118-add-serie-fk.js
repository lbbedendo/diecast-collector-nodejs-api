"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("Models", ["serieId"], {
      type: "foreign key",
      name: "serie_fk",
      references: {
        table: "Series",
        field: "id"
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("Models", "serie_fk");
  }
};
