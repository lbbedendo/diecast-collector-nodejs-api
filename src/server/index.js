const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const db = require("../database/models/index");
const router = require("../router/index");

const app = express();

app.use(morgan("combined"));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Content-Type", "application/json");
  next();
});

router(app, db);

module.exports = app;
