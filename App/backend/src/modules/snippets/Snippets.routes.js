const express = require("express");
const snippets = express.Router();
const {
  postValidationRules,
  editValidationRules,
  validate,
} = require("../../middlewares/validation/SnippetsValidation");
const snippetsController = require("./Snippets.controller");

snippets.get("/all", snippetsController.getAllSnippets);
snippets.get("/single/:postId", snippetsController.getSingleSnippet);
snippets.post(
  "/new",
  postValidationRules,
  validate,
  snippetsController.newSnippet,
);
snippets.get("/mySnippets", snippetsController.getMySnippets);
snippets.patch(
  "/edit/:postId",
  editValidationRules,
  validate,
  snippetsController.editSnippet,
);
snippets.delete("/delete/:postId", snippetsController.deleteSnippet);
snippets.patch("/star/:postId", snippetsController.toggleStar);
module.exports = snippets;
