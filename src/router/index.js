const routes = [
  require("./routes/automakers"),
  require("./routes/models"),
  require("./routes/brands"),
  require("./routes/series")
];

module.exports = (app, db) => {
  return routes.forEach(route => {
    route(app, db);
  });
};
