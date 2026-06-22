const express = require("express");
const auth = express.Router();
const authController = require("./Auth.controller");

auth.post("/register", authController.registerUser);
auth.post("/login", authController.login)
module.exports = auth;
