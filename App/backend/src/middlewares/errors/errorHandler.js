const HttpException = require("../../exception/index");
const mongoose = require("mongoose");
const pc = require("picocolors");

const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpException) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors || null,
    });
  }
  console.error(pc.red("🔴 SERVER CRITIC ERROR: " + pc.yellow(err.message)));
  return res
    .status(500)
    .json({ statusCode: 500, message: "Internal server error" });
};

module.exports = errorHandler;
