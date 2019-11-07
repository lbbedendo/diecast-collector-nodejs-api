require("dotenv").config();

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: process.env.DATABASE_DIALECT
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: process.env.DATABASE_DIALECT
  },
  production: {
    url: process.env.PROD_DATABASE_URL,
    dialect: process.env.DATABASE_DIALECT
  }
};
