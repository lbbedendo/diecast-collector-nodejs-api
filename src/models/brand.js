module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define('brand', {
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
    year: {
      type: DataTypes.INTEGER
    }
  });
  return Brand;
}