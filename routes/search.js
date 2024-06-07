const expresses = require("express");
const router = expresses.Router();

const { OpenAI } = require("@langchain/openai");

const { buildPrompt } = require("./../src");

router.get("/", async (req, res) => {
  const queryText = req.query.q; // "give me the 2 more important persons that born before the Oct, the 5th of 2014 and actually is living in Florida or Havana";

  if (!queryText) {
    res.status(400).json({
      error: "not query found",
    });
    return;
  }

  const LLMPrompt = buildPrompt(queryText);

  const model = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    maxTokens: 512, // only for completion
    temperature: 0,
  });

  console.time("llm_call");

  const llmResult = await model.invoke(LLMPrompt);

  console.timeEnd("llm_call");

  // const vectorStore = new OpenSearchVectorStore(embedding, {
  //   client: OSClient,
  //   indexName: process.env.OS_SEMANTIC_SEARCH_INDEX, // Will default to `documents`
  // });

  // const chain = ConversationalRetrievalQAChain.fromLLM(
  //   model,
  //   vectorStore.asRetriever(10, undefined, {
  //     minSimilarityScore: 0.5,
  //     dynamicK: true,
  //   }),
  //   {
  //     qaTemplate: qa_template,
  //     returnSourceDocuments: true,
  //     // verbose: true,
  //   }
  // );

  // const resp = await chain.call({
  //   question: "what day is today",
  //   chat_history: "",
  // });

  res.json({
    response: JSON.parse(llmResult),
  });
});

module.exports = router;
