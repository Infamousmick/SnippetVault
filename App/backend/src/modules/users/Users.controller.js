const usersService = require("./Users.service");
const HttpException = require("../../exception/index")

const uploadAvatar = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const loggedUserId = req.user._id;

    if (!req.file) {
      throw new HttpException("No image file provided or upload error", 400);
    }

    const imageUrl = req.file.path;
    const updatedUser = await usersService.uploadAvatar(userId, loggedUserId, imageUrl);

    res.status(200).send({
      statusCode: 200,
      message: "Avatar uploaded successfully",
      user: updatedUser,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = { uploadAvatar };
