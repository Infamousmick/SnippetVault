const aiService = require("./Ai.service");

const askAboutSnippet = async (req, res, next) => {
  try {
    const loggedUserId = req.user._id;
    const { snippetId } = req.params;
    const { question } = req.body;

    const answer = await aiService.askAboutSnippet(
      loggedUserId,
      snippetId,
      question,
    );
    res.status(200).json({ statusCode: 200, answer });
  } catch (e) {
    next(e);
  }
};

const generateSnippetFromPrompt = async (req, res, next) => {
  try {
    const loggedUserId = req.user._id;
    const { description, language } = req.body;

    const generatedCode = await aiService.generateSnippetFromPrompt(
      loggedUserId,
      description,
      language,
    );

    res.status(200).json({statusCode: 200, generatedCode})
  } catch (e) {
    next(e);
  }
};

module.exports = { askAboutSnippet, generateSnippetFromPrompt };
