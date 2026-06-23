const UserNotFoundException = require("../../exception/users/UserNotFoundException");
const HttpException = require("../../exception/index");
const usersSchema = require("./Users.schema");
const snippetsSchema = require("../snippets/Snippets.schema");

const getUser = async (userId) => {
  const user = await usersSchema
    .findById(userId)
    .select("-password_hash")
    .lean();

  if (!user) {
    throw new UserNotFoundException();
  }

  const userSnippets = await snippetsSchema.find({ user_id: userId });
  return { ...user, snippets: userSnippets };
};

const editUser = async (userId, loggedUserId, body) => {
  if (userId.toString() !== loggedUserId.toString()) {
    throw new HttpException("You are not allowed to edit this profile.", 403);
  }

  const user = await usersSchema
    .findByIdAndUpdate(userId, body, { new: true })
    .select("-password_hash");

  if (!user) {
    throw new UserNotFoundException();
  }

  return user;
};

const deleteUser = async (userId, loggedUserId) => {
  if (userId.toString() !== loggedUserId.toString()) {
    throw new HttpException("You are not allowed to delete this profile.", 403);
  }

  const user = await usersSchema
    .findByIdAndDelete(userId)
    .select("-password_hash");
  if (!user) {
    throw new UserNotFoundException();
  }

  await snippetsSchema.deleteMany({ user_id: userId });
  return user;
};

const uploadAvatar = async (userId, loggedUserId, imageUrl) => {
  if (userId.toString() !== loggedUserId.toString()) {
    throw new HttpException(
      "You are not allowed to change this profile photo.",
      403,
    );
  }
  const user = await usersSchema
    .findByIdAndUpdate(userId, { avatar_url: imageUrl }, { new: true })
    .select("-password_hash");

  if (!user) {
    throw new UserNotFoundException();
  }
  return user;
};

module.exports = { uploadAvatar, getUser, editUser, deleteUser };
