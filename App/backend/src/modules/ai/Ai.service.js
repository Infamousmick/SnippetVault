const { GoogleGenAI } = require("@google/genai");
const usersSchema = require("../users/Users.schema");
const snippetsSchema = require("../snippets/Snippets.schema");
const HttpException = require("../../exception/index");
const GeminiKeyNotConfiguredException = require("../../exception/ai/GeminiKeyNotConfiguredException");
const SnippetNotFoundException = require("../../exception/snippets/SnippetsNotFoundException");
const { decryptData } = require("../../utils/encryption");
const mongoose = require("mongoose");

const sanitizeError = (plainError) => {
  if (!plainError) return "Unknown error";
  try {
    const parsedData = JSON.parse(plainError);
    return parsedData.error.message;
  } catch (err) {
    return plainError;
  }
};

const getDecryptedApiKey = async (userId) => {
  const user = await usersSchema.findById(userId);

  if (!user || !user.gemini_key) {
    throw new GeminiKeyNotConfiguredException();
  }

  const apiKey = decryptData(user.gemini_key);
  if (!apiKey) {
    throw new HttpException("Failed to retrieve Gemini API Key", 500);
  }
  return apiKey;
};

const askAboutSnippet = async (userId, snippetId, question) => {
  if (!mongoose.Types.ObjectId.isValid(snippetId)) {
    throw new SnippetNotFoundException();
  }
  const snippet = await snippetsSchema.findById(snippetId);

  if (!snippet) {
    throw new SnippetNotFoundException();
  }

  const apiKey = await getDecryptedApiKey(userId);
  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
You are an expert programming assistant. Analyze the following code snippet and answer the user's question clearly and concisely. Answer using the same language the user used in their question. Be precise and limit yourself to answering based on the snippet provided.

Language: ${snippet.language}
Code:
${snippet.code_content}

User's question: ${question}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (err) {
    if (err.status === 429) {
      throw new HttpException(
        "The Gemini API quota has been exceeded. Please try again later or check your plan.",
        503,
      );
    }

    throw new HttpException(
      sanitizeError(err.message) || "Gemini API request failed",
      502,
    );
  }
};

const generateSnippetFromPrompt = async (userId, description, language) => {
  const apiKey = await getDecryptedApiKey(userId);
  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
Generate a code snippet in ${language} that does the following: ${description}.
Respond with code only, without additional explanations, and without Markdown code fences.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text;
  } catch (err) {
    if (err.status === 429) {
      throw new HttpException(
        "The Gemini API quota has been exceeded. Please try again later or check your plan.",
        503,
      );
    }

    throw new HttpException(
      sanitizeError(err.message) || "Gemini API request failed",
      502,
    );
  }
};

module.exports = { askAboutSnippet, generateSnippetFromPrompt };
