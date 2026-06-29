const snippetsService = require("./Snippets.service");

const getAllSnippets = async (req, res, next) => {
  try {
    const { sort } = req.query;
    let sortQuery;
    if (sort === "Most Forked") {
      sortQuery = { forks: -1 };
    } else if (sort == "Newest") {
      sortQuery = { createdAt: -1 };
    } else {
      sortQuery = { stars: -1 };
    }
    const allSnippets = await snippetsService.getAllSnippets(sortQuery);

    res.status(200).send({ statusCode: 200, allSnippets });
  } catch (e) {
    next(e);
  }
};

const getSingleSnippet = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const snippet = await snippetsService.getSingleSnippet(postId);
    res.status(200).send({ statusCode: 200, snippet });
  } catch (e) {
    next(e);
  }
};
const newSnippet = async (req, res, next) => {
  try {
    const { body } = req;

    const snippetData = {
      ...body,
      user_id: req.user._id,
    };

    const newSnippet = await snippetsService.newSnippet(snippetData);

    res.status(201).send({
      statusCode: 201,
      message: "New Snippet Post posted!",
      newSnippet,
    });
  } catch (e) {
    next(e);
  }
};

const getMySnippets = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const mySnippets = await snippetsService.getMySnippets(userId);

    res.status(200).send({ statusCode: 200, mySnippets });
  } catch (e) {
    next(e);
  }
};

const editSnippet = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { body } = req;
    const userId = req.user._id;

    const editedSnippet = await snippetsService.editSnippet(
      postId,
      body,
      userId,
    );

    res.status(200).send({
      statusCode: 200,
      message: "Post edited successfully",
      editedSnippet,
    });
  } catch (e) {
    next(e);
  }
};

const deleteSnippet = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;

    const deletedSnippet = await snippetsService.deleteSnippet(postId, userId);

    res.status(200).send({
      statusCode: 200,
      message: " Post deleted successfully",
      deletedPost,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  newSnippet,
  getSingleSnippet,
  getMySnippets,
  getAllSnippets,
  editSnippet,
  deleteSnippet,
};
