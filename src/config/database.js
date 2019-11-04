const Sequelize = require('sequelize');
const env = require('./env');

const sequelize = new Sequelize(
  env.DATABASE_NAME,
  env.DATABASE_USERNAME,
  env.DATABASE_PASSWORD,
  {
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    dialect: env.DATABASE_DIALECT
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.automakers = require('../models/automaker')(sequelize, Sequelize);
db.brands = require('../models/brand')(sequelize, Sequelize);
db.series = require('../models/serie')(sequelize, Sequelize);
db.models = require('../models/model')(sequelize, Sequelize);

db.automakers.hasMany(db.models);
db.brands.hasMany(db.models);
db.series.hasMany(db.models);

module.exports = db;