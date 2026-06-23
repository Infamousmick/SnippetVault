const express = require("express");
const snippets = express.Router();
const {
  postValidationRules,
  editValidationRules,
  validate,
} = require("../../middlewares/validation/SnippetsValidation");
const snippetsController = require("./Snippets.controller");

snippets.get("/all", snippetsController.getPosts);
snippets.get("/single/:postId", snippetsController.getSingleSnippet);
snippets.post(
  "/new",
  postValidationRules,
  validate,
  snippetsController.newPost,
);
snippets.get("/myPosts", snippetsController.getMyPosts);
snippets.patch(
  "/edit/:postId",
  editValidationRules,
  validate,
  snippetsController.editPost,
);
snippets.delete("/delete/:postId", snippetsController.deletePost);

module.exports = snippets;
