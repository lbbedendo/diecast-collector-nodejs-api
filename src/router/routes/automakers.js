module.exports = (app, db) => {
  app.get('/automakers', (req, res) => {
    return db.automakers.findAll().then(automakers => {
      res.json(automakers);
    });
  });

  app.get('/automakers/:id', (req, res) => {
    const id = req.params.id;
    return db.automakers.findByPk(id).then(automaker => {
      res.json(automaker);
    });
  });

  app.post('/automakers', (req, res) => {

  });
};