const usersService = require("./Users.service");
const HttpException = require("../../exception/index");

const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { page, pageSize, queryStr } = req.query;
    const pageNum = parseInt(page, 10) || 1;
    const pageSizeNum = parseInt(pageSize, 10) || 5;
    const user = await usersService.getUser(
      userId,
      pageNum,
      pageSizeNum,
      queryStr,
    );

    res.status(200).send({ statusCode: 200, user });
  } catch (e) {
    next(e);
  }
};

const editUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const loggedUserId = req.user._id;
    const { body } = req;
    const editedUser = await usersService.editUser(userId, loggedUserId, body);

    res.status(200).send({
      statusCode: 200,
      message: "User info updated",
      user: editedUser,
    });
  } catch (e) {
    next(e);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const loggedUserId = req.user._id;

    const deletedUser = await usersService.deleteUser(userId, loggedUserId);

    res.status(200).send({
      statusCode: 200,
      message: "User deleted successfully",
      user: deletedUser,
    });
  } catch (e) {
    next(e);
  }
};
const uploadAvatar = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const loggedUserId = req.user._id;

    if (!req.file) {
      throw new HttpException("No image file provided or upload error", 400);
    }

    const imageUrl = req.file.path;
    const updatedUser = await usersService.uploadAvatar(
      userId,
      loggedUserId,
      imageUrl,
    );

    res.status(200).send({
      statusCode: 200,
      message: "Avatar uploaded successfully",
      user: updatedUser,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = { uploadAvatar, getUser, editUser, deleteUser };
