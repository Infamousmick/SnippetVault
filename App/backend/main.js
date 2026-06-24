require("dotenv").config();
const express = require("express");
const server = express();
const PORT = process.env.PORT || 3001;
const initDatabaseConnection = require("./src/config/db");
const AuthRoute = require("./src/modules/auth/Auth.routes");
const SnippetsRoute = require("./src/modules/snippets/Snippets.routes");
const UsersRoute = require("./src/modules/users/Users.routes");
const githubOauthRoute = require("./src/modules/oauth/oauth.route");
const verifyToken = require("./src/middlewares/auth/auth.middlewares");
const cors = require("cors");
const errorHandler = require("./src/middlewares/errors/errorHandler");
const { requestLogger } = require("./src/middlewares/logger/logger");
const pc = require("picocolors");

server.use(cors());
server.use(express.json());
server.use(requestLogger);
server.use("/auth", AuthRoute);
server.use("/oauth", githubOauthRoute);
server.use(verifyToken);
server.use("/snippets", SnippetsRoute);
server.use("/users", UsersRoute);

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
