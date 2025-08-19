import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { z } from "zod";
import rateLimit from "express-rate-limit";

const app = express();
const port = process.env.PORT || 3000;
dotenv.config();
app.use(express.json());
app.use(cors());

// const sys_prompt = "You are an AI code summarizer. Your job is to analyze and summarize code snippets, functions. Provide clear, concise, and accurate explanations of what the code does, focusing on the logic and purpose. Avoid guessing beyond what's in the code. Use plain language that developers of all levels can understand. When relevant, mention input/output, dependencies, and overall structure. Do not rewrite the code. Do not speculate or over-explain.Summarize the following"

const aiSummarySchema = z.object({
  language: z.string().min(1, "Language is required"),
  codeSent: z.string().min(1, "Code is required"),
  model: z.string().min(1, "Model is required"),
});

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const limiter = rateLimit({
  windowMs: 60000,
  limit: 10,
  message: {
    error:
      "Too many requests. Please try again later. Rate limiter is enabled for safety purposes. The limit is 10 requests per minute.",
  },
});

app.use(limiter);

app.get("/", (req, res) => {
  res.json({
    message: "working perfectly",
  });
});

app.post("/ai-summary", async (req, res) => {
  const start = Date.now();
  const parseResult = aiSummarySchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({
      error: "Invalid input",
    });
  }

  const { language, codeSent, model } = parseResult.data;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: `You are an AI code summarizer/explainer. Your job is to analyze and summarize code snippets, functions. Provide clear, concise, and accurate explanations of what the code does, focusing on the logic and purpose. You will go through each function and explain it. Avoid guessing beyond what's in the code. Use plain language that developers of all levels can understand. When relevant, mention input/output, dependencies, and overall structure. Do not rewrite the code. Do not speculate or over-explain. Response only if the user provides with code, ignore if the user provide other than code. Go through the code given below and Summarize the following code written in ${language}
      code: ${codeSent}`,
    });

    const end = Date.now();
    const modelResponseTime = ((end - start)/1000);
    res.json({
      response: response.text,
      modelVersion: response.modelVersion,
      promptTokenCount: response.usageMetadata.promptTokenCount,
      candidatesTokenCount: response.usageMetadata.candidatesTokenCount,
      totalTokenCount: response.usageMetadata.totalTokenCount,
      thoughtsTokenCount: response.usageMetadata.thoughtsTokenCount,
      modelResponseTime: modelResponseTime
    });
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.use((err, req, res, next) => {
  return res.status(400).json({
    message: "internal server error ",
  });
  console.log(err);
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(port,"0.0.0.0", () => {
  console.log(`Server running on http://localhost:${port}`);
});
