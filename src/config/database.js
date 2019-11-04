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

db.automaker = require('../models/automaker')(sequelize, Sequelize);
db.brand = require('../models/brand')(sequelize, Sequelize);
db.serie = require('../models/serie')(sequelize, Sequelize);
db.model = require('../models/model')(sequelize, Sequelize);

db.automaker.hasMany(db.model);
db.brand.hasMany(db.model);
db.serie.hasMany(db.model);

module.exports = db;