exports.unprocessableEntity = (res, msg) => res.status(422).json({ msg });

exports.notFound = (res, msg = "Resource not found") =>
  res.status(404).json({ msg });

exports.requestValidationError = (res, errors) => {
  return res.status(422).json({ errors: errors.array() });
};
