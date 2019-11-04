module.exports = (sequelize, DataTypes) => {
  const Serie = sequelize.define('serie', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Serie;
}