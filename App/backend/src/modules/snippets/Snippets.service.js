const SnippetNotFoundException = require("../../exception/snippets/SnippetsNotFoundException");
const HttpException = require("../../exception/index");
const snippetsSchema = require("./Snippets.schema");

const findCorrespondence = async (postId, userId) => {
  const snippet = await snippetsSchema.findById(postId);

  if (!snippet) {
    throw new SnippetNotFoundException("Snippet not found", 404);
  }

  if (snippet.user_id.toString() !== userId.toString()) {
    throw new HttpException(
      "You are not authorized to operate this snippet",
      403,
    );
  }
  return snippet;
};

const getPosts = async () => {
  return await snippetsSchema.find().populate("user_id", "username avatar_url");
};
const newPost = async (body) => {
  return await new snippetsSchema(body).save();
};

const getSingleSnippet = async (postId) => {
  const snippet = await snippetsSchema
    .findById(postId)
    .populate("user_id", "username avatar_url");

  if (!snippet) {
    throw new SnippetNotFoundException("Snippet not found", 404);
  }

  return snippet;
};
const getMyPosts = async (userId) => {
  return await snippetsSchema
    .find({ user_id: userId })
    .populate("user_id", "username avatar_url");
};

const editPost = async (postId, body, userId) => {
  await findCorrespondence(postId, userId);

  return await snippetsSchema.findByIdAndUpdate(postId, body, { new: true });
};

const deletePost = async (postId, userId) => {
  await findCorrespondence(postId, userId);

  return await snippetsSchema.findByIdAndDelete(postId);
};

module.exports = {
  newPost,
  getSingleSnippet,
  getMyPosts,
  getPosts,
  editPost,
  deletePost,
};
