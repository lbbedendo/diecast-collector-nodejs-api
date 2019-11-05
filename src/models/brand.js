module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define("brands", {
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
    }
  });
  return Brand;
};
