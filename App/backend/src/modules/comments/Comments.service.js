const CommentNotFoundException = require("../../exception/comments/CommentNotFoundException");
const HttpException = require("../../exception/index");

const commentsSchema = require("./Comments.schema");

const findCorrespondence = async (commentId, userId) => {
  const comment = await commentsSchema.findById(commentId);

  if (!comment) {
    throw new CommentNotFoundException("COmment not found", 404);
  }

  if (comment.user_id.toString() !== userId.toString()) {
    throw new HttpException(
      "You are not authorized to operate this comment",
      403,
    );
  }
  return comment;
};

const getAllComments = async (snippetId) => {
  return await commentsSchema
    .find({ snippet_id: snippetId })
    .populate("user_id", "username avatar_url");
};

const createComment = async (body) => {
  return await new commentsSchema(body).save();
};

const editComment = async ({ userId, commentId, body }) => {
  await findCorrespondence(commentId, userId);
  return await commentsSchema.findByIdAndUpdate(commentId, body, { new: true });
};

const deleteComment = async (commentId, userId) => {
  await findCorrespondence(commentId, userId);

  return await commentsSchema.findByIdAndDelete(commentId);
};
module.exports = { getAllComments, createComment, editComment, deleteComment };
