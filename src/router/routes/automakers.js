const { validationResult } = require("express-validator");
const { notFound, requestValidationError } = require("./shared/httpErrors");
const { bodySchema, validate } = require("./validators/automakerValidator");

module.exports = (app, db) => {
  app.get("/automakers", (req, res) => {
    db.Automaker.findAll().then(automakers => {
      res.json(automakers);
    });
  });

  app.get("/automakers/:id", (req, res) => {
    const id = req.params.id;
    db.Automaker.findByPk(id).then(automaker => {
      if (!automaker) {
        notFound(res, `Automaker ${id} not found`);
      } else {
        res.json(automaker);
      }
    });
  });

  app.post("/automakers", bodySchema, validate, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return requestValidationError(res, errors);
    }

    db.Automaker.create({
      name: req.body.name,
      country: req.body.country
    })
      .then(automaker => res.status(201).json(automaker))
      .catch(err => res.status(500).json(err));
  });

  app.put("/automakers/:id", bodySchema, validate, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return requestValidationError(res, errors);
    }

    const id = req.params.id;
    db.Automaker.findByPk(id).then(automaker => {
      if (!automaker) {
        return notFound(res, `Automaker ${id} not found`);
      }
      automaker.name = req.body.name;
      automaker.country = req.body.country;
      automaker
        .save()
        .then(a => res.json(a))
        .catch(err => res.status(500).json(err));
    });
  });

  app.delete("/automakers/:id", (req, res) => {
    db.Automaker.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(itemsRemoved => {
        res.status(200).json(itemsRemoved);
      })
      .catch(err => res.status(500).json(err));
  });
};
