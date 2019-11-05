const { check, validationResult } = require("express-validator");

const validation = [
  check("name", "Name is required and must be a string")
    .not()
    .isEmpty()
    .isString()
];

module.exports = (app, db) => {
  app.post("/models", validation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
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
    model.save().then(m => res.json(m));
  });
};
