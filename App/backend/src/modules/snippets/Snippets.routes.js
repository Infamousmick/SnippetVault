const express = require("express");
const snippets = express.Router();
const snippetsController = require("./Snippets.controller");

snippets.get("/all", snippetsController.getPosts);
snippets.get("/single/:postId", snippetsController.getSingleSnippet);
snippets.post("/new", snippetsController.newPost);
snippets.get("/myPosts", snippetsController.getMyPosts);
snippets.put("/edit/:postId", snippetsController.editPost);
snippets.delete("/delete/:postId", snippetsController.deletePost);

module.exports = snippets;
