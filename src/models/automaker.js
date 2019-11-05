module.exports = (sequelize, DataTypes) => {
  const Automaker = sequelize.define("automakers", {
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
    country: {
      type: DataTypes.STRING
    }
  });
  return Automaker;
};
