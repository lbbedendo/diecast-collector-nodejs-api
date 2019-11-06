const { check, validationResult } = require("express-validator");
const { notFound } = require("./shared/constants");

const validation = [
  check("name", "Name is required and must be a string")
    .not()
    .isEmpty()
    .isString(),
  check("year", "Year must be a positive integer").isInt({ gt: 0 })
];

module.exports = (app, db) => {
  app.get("/series", (req, res) => {
    db.series.findAll().then(series => {
      res.json(series);
    });
  });

  app.get("/series/:id", (req, res) => {
    const id = req.params.id;
    db.series.findByPk(id).then(serie => {
      if (!serie) {
        res.status(404).json(notFound);
      } else {
        res.json(serie);
      }
    });
  });

  app.post("/series", validation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    db.series
      .create({
        name: req.body.name,
        year: req.body.year
      })
      .then(serie => {
        res.json(serie);
      })
      .catch(err => res.status(500).json(err));
  });

  app.put("/series/:id", validation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    db.series.findByPk(req.params.id).then(serie => {
      if (!serie) {
        return res.status(404).json(notFound);
      }
      serie.name = req.body.name;
      serie.year = req.body.year;
      serie
        .save()
        .then(s => res.json(s))
        .catch(err => res.status(500).json(err));
    });
  });

  app.delete("/series/:id", (req, res) => {
    db.series
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(itemsRemoved => res.json(itemsRemoved))
      .catch(err => res.json(err));
  });
};
