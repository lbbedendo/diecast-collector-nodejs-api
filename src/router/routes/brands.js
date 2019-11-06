const { check, validationResult } = require("express-validator");
const { notFound } = require("./shared/constants");

const validation = [
  check("name", "Name is required and must be a string")
    .not()
    .isEmpty()
    .isString()
];

module.exports = (app, db) => {
  app.get("/brands", (req, res) => {
    db.brands.findAll().then(brands => {
      res.json(brands);
    });
  });

  app.get("/brands/:id", (req, res) => {
    const id = req.params.id;
    db.brands.findByPk(id).then(brand => {
      if (!brand) {
        res.status(404).json(notFound);
      } else {
        res.json(brand);
      }
    });
  });

  app.post("/brands", validation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    db.brands
      .create({
        name: req.body.name
      })
      .then(brand => {
        res.json(brand);
      })
      .catch(err => res.status(500).json(err));
  });

  app.put("/brands/:id", validation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    db.brands.findByPk(req.params.id).then(brand => {
      if (!brand) {
        return res.status(404).json(notFound);
      }
      brand.name = req.body.name;
      brand
        .save()
        .then(b => res.json(b))
        .catch(err => res.status(500).json(err));
    });
  });

  app.delete("/brands/:id", (req, res) => {
    db.brands
      .destroy({
        where: { id: req.params.id }
      })
      .then(itemsRemoved => res.json(itemsRemoved))
      .catch(err => res.status(500).json(err));
  });
};
