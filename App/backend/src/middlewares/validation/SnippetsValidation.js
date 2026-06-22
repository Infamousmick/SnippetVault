const { body, validationResult } = require("express-validator");
const BadRequestException = require("../../exception/BadRequestException");

const postValidationRules = [
  body("title").trim().notEmpty().withMessage("The title is mandatory"),
  body("code_content").trim().notEmpty().withMessage("Snippet content is mandatory"),
  body("language").trim().notEmpty().withMessage("Snippet language is mandatory"),
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

  next(new BadRequestException("Post data validation error", extractedErrors));
};

module.exports = { postValidationRules, validate };
