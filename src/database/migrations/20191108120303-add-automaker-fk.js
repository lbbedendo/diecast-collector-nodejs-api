"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("Models", ["automakerId"], {
      type: "foreign key",
      name: "automaker_fk",
      references: {
        table: "Automakers",
        field: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("Models", "automaker_fk");
  }
};
