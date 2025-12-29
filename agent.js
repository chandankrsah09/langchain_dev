import config from "dotenv";
config.config();

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { initializeAgentExecutorWithOptions } from "@langchain/classic/agents";
import { SerpAPI } from "@langchain/community/tools/serpapi";

const model = new ChatGoogleGenerativeAI({
    modelName: "gemini-1.5-flash",  // ✅ Valid model name
    // modelName: "gemini-2.0-flash-exp",  // ✅ Alternative
    apiKey: process.env.google_api_key,
});

const searchTool = new SerpAPI(process.env.serp_api_key, {
    maxResults: 10,
    location: "Austin, Texas, United States",
    hl: "en",
    gl: "us",
    googleApiKey: process.env.google_api_key,  // SerpAPI needs this too
});

const tools = [searchTool];

const executor = initializeAgentExecutorWithOptions(tools, model, {
    agentType: "zero-shot-react-description",
});

const input = "What is the latest news on the stock market?";
const result = await executor.invoke({ input });
console.log(result);