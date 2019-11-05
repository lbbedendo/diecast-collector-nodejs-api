const routes = [require("./routes/automakers"), require("./routes/models")];

module.exports = (app, db) => {
  return routes.forEach(route => {
    route(app, db);
  });
};
