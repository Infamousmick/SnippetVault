const express = require("express");
const auth = express.Router();

const {
  registerValidationRules,
  loginValidationRules,
  validate,
} = require("../../middlewares/validation/AuthValidation");
const authController = require("./Auth.controller");

auth.post(
  "/register",
  registerValidationRules,
  validate,
  authController.registerUser,
);
auth.post("/login", loginValidationRules, validate, authController.login);
module.exports = auth;
