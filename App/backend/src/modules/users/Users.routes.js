const express = require("express");
const users = express.Router();
const usersController = require("./Users.controller");
const {
  editUserValidationRules,
  validate,
} = require("../../middlewares/validation/UsersValidation");

const cloudUpload = require("../../middlewares/upload/cloudUpload");

users.get("/:userId", usersController.getUser);
users.patch(
  "/edit/:userId",
  editUserValidationRules,
  validate,
  usersController.editUser,
);
users.post(
  "/:userId/avatar",
  cloudUpload.single("avatar"),
  usersController.uploadAvatar,
);
users.delete("/delete/:userId", usersController.deleteUser);

module.exports = users;
