const authService = require("./Auth.service");

const registerUser = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await authService.registerUser(body);

    res.status(201).send({ statusCode: 201, message: "User registerd!", user });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const { body } = req;
    const { token, user } = await authService.login(body);

    res
      .header("authorization", token)
      .status(200)
      .send({ statusCode: 200, message: "Login successfully", token, user });
  } catch (e) {
    next(e);
  }
};

module.exports = { registerUser, login };
