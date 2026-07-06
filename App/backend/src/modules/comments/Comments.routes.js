const express = require("express");
const comments = express.Router({ mergeParams: true });
const commentsController = require("./Comments.controller");

comments.get("/", commentsController.getAllComments);
comments.post("/", commentsController.createComment);
comments.patch("/:commentId", commentsController.editComment);
comments.delete("/:commentId", commentsController.deleteComment);
module.exports = comments;
