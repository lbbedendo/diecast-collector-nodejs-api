const { checkSchema, validationResult } = require("express-validator");
const { notFound, requestValidationError } = require("./shared/httpErrors");

const idValidation = checkSchema({
  id: {
    in: "params",
    errorMessage: "Id must be an integer",
    isInt: true,
    toInt: true
  }
});

const bodyValidation = checkSchema({
  name: {
    in: "body",
    errorMessage: "Name is required",
    isString: true,
    trim: true
  },
  year: {
    in: "body",
    errorMessage: "Year must be an integer",
    isInt: true,
    optional: {
      options: {
        nullable: true
      }
    }
  }
});

const idAndBodyValidation = [idValidation, bodyValidation];

module.exports = (app, db) => {
  app.get("/series", (req, res) => {
    db.Serie.findAll().then(series => {
      res.json(series);
    });
  });

  app.get("/series/:id(\\d+)?", (req, res) => {
    const id = req.params.id;
    db.Serie.findByPk(id)
      .then(serie => {
        if (!serie) {
          notFound(res, `Serie ${id} not found`);
        } else {
          res.json(serie);
        }
      })
      .catch(err => res.status(500).json(err));
  });

  app.post("/series", bodyValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return requestValidationError(res, errors);
    }

    db.Serie.create({
      name: req.body.name,
      year: req.body.year
    })
      .then(serie => res.status(201).json(serie))
      .catch(err => res.status(500).json(err));
  });

  app.put("/series/:id", idAndBodyValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return requestValidationError(res, errors);
    }

    db.Serie.findByPk(req.params.id).then(serie => {
      if (!serie) {
        return notFound(res, `Serie ${id} not found`);
      }
      serie.name = req.body.name;
      serie.year = req.body.year;
      serie
        .save()
        .then(s => res.json(s))
        .catch(err => res.status(500).json(err));
    });
  });

  app.delete("/series/:id(\\d+)?", idValidation, (req, res) => {
    db.Serie.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(itemsRemoved => res.json(itemsRemoved))
      .catch(err => res.json(err));
  });
};
