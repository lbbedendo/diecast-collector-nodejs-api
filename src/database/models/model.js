"use strict";
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    "Model",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      year: DataTypes.INTEGER,
      scale: DataTypes.STRING,
      colorRgba: DataTypes.STRING,
      automakerId: DataTypes.INTEGER,
      brandId: DataTypes.INTEGER,
      serieId: DataTypes.INTEGER
    },
    {}
  );
  Model.associate = function(models) {
    Model.belongsTo(models.Automaker);
    Model.belongsTo(models.Brand);
    Model.belongsTo(models.Serie);
  };
  return Model;
};
