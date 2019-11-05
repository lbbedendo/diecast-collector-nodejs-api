module.exports = (sequelize, DataTypes) => {
  const Serie = sequelize.define("series", {
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
    year: {
      type: DataTypes.INTEGER
    }
  });
  return Serie;
};
