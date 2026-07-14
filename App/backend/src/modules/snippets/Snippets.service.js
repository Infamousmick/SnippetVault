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

const getAllSnippets = async (
  sortQuery,
  pageNum,
  pageSizeNum,
  queryStr,
  starred,
  userId,
) => {
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

  if (starred === "true") {
    query.stars = userId;
  }
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
  return await snippetsSchema.findByIdAndUpdate(postId, body, {
    new: true,
  });
};

const deleteSnippet = async (postId, userId) => {
  await findCorrespondence(postId, userId);

  return await snippetsSchema.findByIdAndDelete(postId);
};

const toggleStar = async (postId, userId) => {
  const snippet = await snippetsSchema.exists({ _id: postId });

  if (!snippet) {
    throw new SnippetNotFoundException("Snippet not found", 404);
  }

  const hasStarred = await snippetsSchema.findOne({
    _id: postId,
    stars: userId,
  });

  let isStarred;
  if (hasStarred) {
    await snippetsSchema.updateOne(
      { _id: postId },
      {
        $pull: { stars: userId },
        $inc: { starsCount: -1 },
      },
    );
    isStarred = false;
  } else {
    await snippetsSchema.updateOne(
      { _id: postId },
      {
        $addToSet: { stars: userId },
        $inc: { starsCount: 1 },
      },
    );
    isStarred = true;
  }
  const updatedSnippet = await snippetsSchema
    .findById(postId)
    .select("starsCount");
  const starsCount = updatedSnippet.starsCount;
  return { isStarred, starsCount };
};

module.exports = {
  newSnippet,
  getSingleSnippet,
  getMySnippets,
  getAllSnippets,
  editSnippet,
  deleteSnippet,
  toggleStar,
};
