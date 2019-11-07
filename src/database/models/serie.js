"use strict";
module.exports = (sequelize, DataTypes) => {
  const Serie = sequelize.define(
    "Serie",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      year: DataTypes.INTEGER
    },
    {}
  );
  Serie.associate = function(models) {
    // associations can be defined here
  };
  return Serie;
};
