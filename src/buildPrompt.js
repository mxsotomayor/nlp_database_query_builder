const buildPrompt = (question = "") => {
  return process.env.__LLM_PROMPT.replace("{question}", question);
};

module.exports = buildPrompt;
