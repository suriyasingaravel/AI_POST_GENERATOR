import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { TavilySearch } from "@langchain/tavily";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableParallel } from "@langchain/core/runnables";
import { RunnableMap } from "@langchain/core/runnables";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Gemini LLM setup
const llm = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  apiKey: process.env.GEMINI_API_KEY,
});

// Tavily search function
async function webSearch(topic) {
  const search_tool = new TavilySearch({
    apiKey: process.env.TAVILY_API_KEY,
    maxResults: 5,
    topic: "general",
  });
  const response = await search_tool.invoke({ query: topic }); // <--- FIXED!
  let content = "";
  if (response && Array.isArray(response.results)) {
    for (const result of response.results) {
      content += result.content || "";
    }
  }
  console.log("Search results content:", content);
  return content;
}

// Prompts
const summaryPrompt = new PromptTemplate({
  template: "Generate a 5 point summary on below {search_result}",
  inputVariables: ["search_result"],
});

const linkedInPrompt = new PromptTemplate({
  template: `You are a social media manager.
Write a professional, insightful, and engaging LinkedIn post based on the below summary, the tone should be thoughtful, value-driven and compelling. Avoid hash tags unless explicitly mentioned.

{summary}

Guidelines:
-Write in the first person
-Keep it within 2-3 short paragraphs
-Aim to educate, inspire and provoke thought.`,
  inputVariables: ["summary"],
});

const twitterPrompt = new PromptTemplate({
  template: `You are a social media expert.

Write a catchy Twitter post under 300 characters based on this summary:
{summary}
`,
  inputVariables: ["summary"],
});

const facebookPrompt = new PromptTemplate({
  template: `You are a fun and casual content creator.

Write an Instagram caption using emojis and friendly tone based on this summary:
{summary}
`,
  inputVariables: ["summary"],
});

// POST endpoint for generating posts from topic
app.post("/generate-posts", async (req, res) => {
  try {
    const { topic } = req.body;

    // Validation: ensure topic is provided and is not empty
    if (!topic || typeof topic !== "string" || topic.trim().length < 4) {
      return res
        .status(400)
        .json({ error: "Please provide a valid topic for post generation." });
    }

    // Step 1: Web Search using the topic
    const search_result = await webSearch(topic);

    // Step 2: Summarize the search result
    const summaryChain = summaryPrompt.pipe(llm);
    const summary = await summaryChain.invoke({ search_result });

    // Step 3: Generate posts in parallel
    const linkedInChain = linkedInPrompt.pipe(llm);
    const twitterChain = twitterPrompt.pipe(llm);
    const facebookChain = facebookPrompt.pipe(llm);

    const parallelChain = RunnableMap.from({
      LinkedIn: linkedInChain,
      Twitter: twitterChain,
      Facebook: facebookChain,
    });

    const posts = await parallelChain.invoke({ summary });

    // Step 4: Respond
    return res.json({
      topic,
      summary,
      posts,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Error generating posts: " + (err.message || err) });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`GenAI Backend running on port ${PORT}`));
