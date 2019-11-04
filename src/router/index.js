const routes = [
  require('./routes/automakers')
];

module.exports = (app, db) => {
  return routes.forEach(route => {
    route(app, db);
  });
};