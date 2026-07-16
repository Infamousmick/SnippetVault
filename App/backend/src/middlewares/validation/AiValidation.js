const { body, validationResult, matchedData } = require("express-validator");
const BadRequestException = require("../../exception/BadRequestException");

const askAboutSnippetValidationRules = [
  body("question")
    .trim()
    .notEmpty()
    .withMessage("Question is mandatory")
    .isLength({ max: 500 })
    .withMessage("Question is too long"),
];

const generateSnippetValidationRules = [
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is mandatory")
    .isLength({ max: 500 })
    .withMessage("Description is too long"),
  body("language").trim().notEmpty().withMessage("Language is mandatory"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const safeBody = matchedData(req, { locations: ["body"] });
    req.body = safeBody;
    return next();
  }

  const extractedErrors = errors.array().map((err) => ({
    field: err.path,
    message: err.msg,
  }));

  next(new BadRequestException("AI request validation error", extractedErrors));
};

module.exports = {
  askAboutSnippetValidationRules,
  generateSnippetValidationRules,
  validate,
};
