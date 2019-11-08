const { validationResult } = require("express-validator");
const { notFound, requestValidationError } = require("./shared/httpErrors");
const { bodySchema, validate } = require("./validators/automakerValidator");

module.exports = (app, db) => {
  app.get("/automakers", async (req, res) => {
    const automakers = await db.Automaker.findAll();
    return res.json(automakers);
  });

  app.get("/automakers/:id", async (req, res) => {
    const id = req.params.id;
    const automaker = await db.Automaker.findByPk(id);
    if (!automaker) {
      return notFound(res, `Automaker ${id} not found`);
    } else {
      return res.json(automaker);
    }
  });

  app.post("/automakers", bodySchema, validate, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return requestValidationError(res, errors);
    }

    try {
      const automaker = await db.Automaker.create({
        name: req.body.name,
        country: req.body.country
      });
      return res.status(201).json(automaker);
    } catch (error) {
      return res.status(500).json(error);
    }
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
