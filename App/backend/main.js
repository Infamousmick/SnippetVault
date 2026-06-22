require("dotenv").config();
const express = require("express");
const initDatabaseConnection = require("./src/config/db");
const AuthRoute = require("./src/modules/auth/Auth.routes");
const SnippetsRoute = require("./src/modules/snippets/Snippets.routes");
const server = express();
const PORT = process.env.PORT || 3001;
const verifyToken = require("./src/middlewares/auth/auth.middlewares");
const cors = require("cors");
const errorHandler = require("./src/middlewares/errors/errorHandler");
const pc = require("picocolors");

server.use(cors());
server.use(express.json());
server.use("/auth", AuthRoute);
server.use(verifyToken);
server.use("/snippets", SnippetsRoute);


const initServer = async () => {
  await initDatabaseConnection();
  server.listen(PORT, () => {
    console.log(
      pc.green("Server running and listening on port: ") + pc.yellow(PORT),
    );
  });
};
server.use(errorHandler);
initServer();
