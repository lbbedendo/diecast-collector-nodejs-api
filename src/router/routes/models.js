const { check, validationResult } = require("express-validator");
const { notFound, requestValidationError } = require("./shared/httpErrors");

const validation = [
  check("name", "Name is required and must be a string")
    .not()
    .isEmpty()
    .isString()
];

module.exports = (app, db) => {
  app.get("/models", (req, res) => {
    db.models.findAll().then(models => {
      res.json(models);
    });
  });

  app.get("/models/:id", (req, res) => {
    const id = req.params.id;
    db.models.findByPk(id).then(model => {
      if (!model) {
        notFound(res, `Model ${id} not found`);
      } else {
        res.json(model);
      }
    });
  });

  app.post("/models", validation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return requestValidationError(res, errors);
    }

    const model = db.models.build({
      name: req.body.name,
      year: req.body.year,
      scale: req.body.scale,
      colorRgba: req.body.colorRgba
    });

    const automakerId = req.body.automakerId;
    if (automakerId) {
      const automaker = await db.automakers.findByPk(automakerId);
      if (!automaker) {
        return res
          .status(422)
          .json({ msg: `Automaker ${automakerId} not found` });
      }
      model.automakerId = automakerId;
    }
    const brandId = req.body.brandId;
    if (brandId) {
      const brand = await db.brands.findByPk(brandId);
      if (!brand) {
        return res.status(422).json({ msg: `Brand ${brandId} not found` });
      }
      model.brandId = brandId;
    }
    const serieId = req.body.serieId;
    if (serieId) {
      const serie = db.series.findByPk(serieId);
      if (!serie) {
        return res.status(422).json({ msg: `Serie ${serieId} not found` });
      }
      model.serieId = serieId;
    }
    model
      .save()
      .then(m => res.json(m))
      .catch(err => res.status(500).json(err));
  });

  app.put("/models/:id", validation, (req, res) => {});

  app.delete("/models/:id", (req, res) => {
    db.models
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(itemsRemoved => res.json(itemsRemoved))
      .catch(err => res.status(500).json(err));
  });
};
