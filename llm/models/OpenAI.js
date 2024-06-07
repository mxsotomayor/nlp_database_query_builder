const { OpenAI } = require("langchain/llms/openai");


const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_KEY,
  maxTokens: 512, // only for completion
  temperature: 0
});

module.exports = model;