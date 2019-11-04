const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('custom-env').env(true);

const db = require('./src/config/database');
const router = require('./src/router/index');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Content-Type', 'application/json');
  next();
});

router(app, db);

db
  .sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('DATABASE_URL: ', process.env.DATABASE_URL);
      console.log('Express listening on port:', process.env.PORT);
    });
  });
