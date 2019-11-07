const { requestValidationError } = require("../shared/httpErrors");
const { checkSchema, validationResult } = require("express-validator");

const bodySchema = checkSchema({
  name: {
    in: "body",
    errorMessage: "Name is required",
    isString: true,
    trim: true
  },
  country: {
    in: "body",
    errorMessage: "Country must be a string",
    isString: true,
    optional: {
      options: {
        nullable: true
      }
    }
  }
});

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return requestValidationError(res, errors);
};

module.exports = {
  bodySchema,
  validate
};
