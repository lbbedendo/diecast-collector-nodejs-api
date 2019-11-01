'use strict';

const env = {
  PORT: process.env.PORT || 8080,
  DATABASE_URL: process.env.DATABASE_URL || 'jdbc:postgresql://localhost:5432/diecast_collector_node_dev',
  DATABASE_NAME: process.env.DATABASE_NAME || 'diecast_collector_node_dev',
  DATABASE_HOST: process.env.DATABASE_HOST || 'localhost',
  DATABASE_USERNAME: process.env.DATABASE_USERNAME || 'diecast_collector',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'diecast_collector',
  DATABASE_PORT: process.env.DATABASE_PORT || 5432,
  DATABASE_DIALECT: process.env.DATABASE_DIALECT || 'postgres'
};

module.exports = env;