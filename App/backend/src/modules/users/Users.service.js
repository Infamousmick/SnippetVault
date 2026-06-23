const UserNotFoundException = require("../../exception/users/UserNotFoundException");
const HttpException = require("../../exception/index");
const usersSchema = require("./Users.schema");

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

module.exports = { uploadAvatar };
