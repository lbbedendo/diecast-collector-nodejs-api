module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('Model', {
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
    colorRgba: DataTypes.STRING
  });
  return Model;
}