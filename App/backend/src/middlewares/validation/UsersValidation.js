const { body, validationResult } = require("express-validator");
const BadRequestException = require("../../exception/BadRequestException");

const editUserValidationRules = [
  body("username")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("If provided, username cannot be empty")
    .isLength({ min: 6 })
    .withMessage("Username must be at least 6 characters"),
  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("If provided, must be a valid email address"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = errors.array().map((err) => ({
    field: err.path,
    message: err.msg,
  }));

  next(new BadRequestException("User data validation error", extractedErrors));
};

module.exports = { editUserValidationRules, validate };
