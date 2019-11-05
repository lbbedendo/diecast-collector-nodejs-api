const { check, validationResult } = require("express-validator");
const { notFound } = require("./shared/constants");

const validation = [
  check("name", "Name is required and must be a string")
    .not()
    .isEmpty()
    .isString(),
  check("country", "Country must be a string")
    .optional()
    .isString()
];

module.exports = (app, db) => {
  app.get("/automakers", (req, res) => {
    db.automakers.findAll().then(automakers => {
      res.json(automakers);
    });
  });

  app.get("/automakers/:id", (req, res) => {
    const id = req.params.id;
    db.automakers.findByPk(id).then(automaker => {
      if (!automaker) {
        res.status(404).json(notFound);
      } else {
        res.json(automaker);
      }
    });
  });

  app.post("/automakers", validation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    db.automakers
      .create({
        name: req.body.name,
        country: req.body.country
      })
      .then(automaker => res.json(automaker))
      .catch(err => res.status(500).json(err));
  });

  app.put("/automakers/:id", validation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    db.automakers.findByPk(req.params.id).then(automaker => {
      if (!automaker) {
        return res.status(404).json(notFound);
      }
      automaker.name = req.body.name;
      automaker.country = req.body.country;
      automaker.save();
      return res.json(automaker);
    });
  });

  app.delete("/automakers/:id", (req, res) => {
    db.automakers
      .destroy({
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
