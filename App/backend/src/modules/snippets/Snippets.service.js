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

const getAllSnippets = async (sortQuery, pageNum, pageSizeNum, queryStr) => {
  const safeQueryStr = queryStr ? queryStr.replaceAll("#", "").trim() : "";
  const query = safeQueryStr
    ? {
        $or: [
          { title: { $regex: safeQueryStr, $options: "i" } },
          { description: { $regex: safeQueryStr, $options: "i" } },
          { language: { $regex: safeQueryStr, $options: "i" } },
          { tags: { $elemMatch: { $regex: safeQueryStr, $options: "i" } } },
        ],
      }
    : {};

  const totalSnippets = await snippetsSchema.countDocuments(query);
  const totalPages = Math.ceil(totalSnippets / pageSizeNum);
  const allSnippets = await snippetsSchema
    .find(query)
    .limit(pageSizeNum)
    .skip((pageNum - 1) * pageSizeNum)
    .sort(sortQuery)
    .populate("user_id", "username avatar_url");

  return { allSnippets, totalSnippets, totalPages };
};

const newSnippet = async (body) => {
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
const getMySnippets = async (userId) => {
  return await snippetsSchema
    .find({ user_id: userId })
    .populate("user_id", "username avatar_url");
};

const editSnippet = async (postId, body, userId) => {
  await findCorrespondence(postId, userId);

  return await snippetsSchema.findByIdAndUpdate(postId, body, { new: true });
};

const deleteSnippet = async (postId, userId) => {
  await findCorrespondence(postId, userId);

  return await snippetsSchema.findByIdAndDelete(postId);
};

module.exports = {
  newSnippet,
  getSingleSnippet,
  getMySnippets,
  getAllSnippets,
  editSnippet,
  deleteSnippet,
};
