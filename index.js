const express = require('express');
const morgan = require('morgan');
require('custom-env').env(true);

const db = require('./src/config/database');

const app = express();

app.use(morgan('combined'));

app.use((req, res, next) => {
  res.header('Content-Type', 'application/json');
  next();
});

app.get('/', (req, res, next) => {
  res.send('Hello from diecast-collector-node-api');
});

db
  .sequelize
  .sync({ force: true })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('DATABASE_URL: ', process.env.DATABASE_URL);
      console.log('Express listening on port:', process.env.PORT);
    });
  });
