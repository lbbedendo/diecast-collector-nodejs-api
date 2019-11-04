module.exports = (sequelize, DataTypes) => {
  const Automaker = sequelize.define('Automaker', {
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
    country: {
      type: DataTypes.STRING
    }
  });
  return Automaker;
}