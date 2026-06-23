const express = require("express");
const users = express.Router();
const usersController = require("./Users.controller");

const cloudUpload = require("../../middlewares/upload/cloudUpload");

users.post(
  "/:userId/avatar",
  cloudUpload.single("avatar"),
  usersController.uploadAvatar,
);

module.exports = users;
