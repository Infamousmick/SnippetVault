const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UsersSchema = require("../users/Users.schema");

const registerUser = async (body) => {
  const { username, email, password } = body;

  const user = await UsersSchema.findOne({
    $or: [{ email: email }, { username: username }],
  });

  if (user) {
    throw new Error("User already registered");
  }
  const newUser = new UsersSchema({
    username,
    email,
    password_hash: password,
  });
  await newUser.save();
  const safeUser = newUser.toObject();
  delete safeUser.password_hash;
  return safeUser;
};

const login = async (body) => {
  const { email, password } = body;
  const user = await UsersSchema.findOne({ email });

  if (!user) {
    throw new Error("Wrong email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    throw new Error("Wrong email or password");
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  const safeUser = user.toObject();
  delete safeUser.password_hash;
  return { token, user: safeUser };
};

module.exports = { registerUser, login };
