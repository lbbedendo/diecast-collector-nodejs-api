"use strict";
module.exports = (sequelize, DataTypes) => {
  const Automaker = sequelize.define(
    "Automaker",
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
      country: DataTypes.STRING
    },
    {}
  );
  Automaker.associate = function(models) {
    // associations can be defined here
  };
  return Automaker;
};
