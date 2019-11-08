"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("Models", ["brandId"], {
      type: "foreign key",
      name: "brand_fk",
      references: {
        table: "Brands",
        field: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("Models", "brand_fk");
  }
};
