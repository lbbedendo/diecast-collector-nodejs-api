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
      });
  });
};
