const { check, validationResult } = require("express-validator");
const { notFound, requestValidationError } = require("./shared/httpErrors");

const validation = [
  check("name", "Name is required and must be a string")
    .not()
    .isEmpty()
    .isString()
];

module.exports = (app, db) => {
  app.get("/brands", (req, res) => {
    db.Brand.findAll().then(brands => {
      res.json(brands);
    });
  });

  app.get("/brands/:id", (req, res) => {
    const id = req.params.id;
    db.Brand.findByPk(id).then(brand => {
      if (!brand) {
        notFound(res, `Brand ${id} not found`);
      } else {
        res.json(brand);
      }
    });
  });

  app.post("/brands", validation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return requestValidationError(res, errors);
    }

    db.Brand.create({
      name: req.body.name
    })
      .then(brand => res.status(201).json(brand))
      .catch(err => res.status(500).json(err));
  });

  app.put("/brands/:id", validation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return requestValidationError(res, errors);
    }

    const id = req.params.id;
    db.Brand.findByPk(id).then(brand => {
      if (!brand) {
        return notFound(res, `Brand ${id} not found`);
      }
      brand.name = req.body.name;
      brand
        .save()
        .then(b => res.json(b))
        .catch(err => res.status(500).json(err));
    });
  });

  app.delete("/brands/:id", (req, res) => {
    db.Brand.destroy({
      where: { id: req.params.id }
    })
      .then(itemsRemoved => res.json(itemsRemoved))
      .catch(err => res.status(500).json(err));
  });
};
