const snippetsService = require("./Snippets.service");

const getPosts = async (req, res, next) => {
  try {
    const allPosts = await snippetsService.getPosts();

    res.status(200).send({ statusCode: 200, allPosts });
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
const newPost = async (req, res, next) => {
  try {
    const { body } = req;

    const snippetData = {
      ...body,
      user_id: req.user._id,
    };

    const newPost = await snippetsService.newPost(snippetData);

    res
      .status(201)
      .send({ statusCode: 201, message: "New Snippet Post posted!", newPost });
  } catch (e) {
    next(e);
  }
};

const getMyPosts = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const myPosts = await snippetsService.getMyPosts(userId);

    res.status(200).send({ statusCode: 200, myPosts });
  } catch (e) {
    next(e);
  }
};

const editPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { body } = req;
    const userId = req.user._id;

    const editedPost = await snippetsService.editPost(postId, body, userId);

    res.status(200).send({
      statusCode: 200,
      message: "Post edited successfully",
      editedPost,
    });
  } catch (e) {
    next(e);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;

    const deletedPost = await snippetsService.deletePost(postId, userId);

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
  newPost,
  getSingleSnippet,
  getMyPosts,
  getPosts,
  editPost,
  deletePost,
};
