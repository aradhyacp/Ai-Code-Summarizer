import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
const app = express();
const port = 3000;
dotenv.config();

// const sys_prompt = "You are an AI code summarizer. Your job is to analyze and summarize code snippets, functions. Provide clear, concise, and accurate explanations of what the code does, focusing on the logic and purpose. Avoid guessing beyond what's in the code. Use plain language that developers of all levels can understand. When relevant, mention input/output, dependencies, and overall structure. Do not rewrite the code. Do not speculate or over-explain.Summarize the following"

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "working perfectly",
  });
});

app.post("/ai-summarizer", async (req, res) => {
  const { language, codeSent } = req.body;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: `You are an AI code summarizer/explainer. Your job is to analyze and summarize code snippets, functions. Provide clear, concise, and accurate explanations of what the code does, focusing on the logic and purpose. You will go through each function and explain it. Avoid guessing beyond what's in the code. Use plain language that developers of all levels can understand. When relevant, mention input/output, dependencies, and overall structure. Do not rewrite the code. Do not speculate or over-explain. Response only if the user provides with code, ignore if the user provide other than code. Go through the code given below and Summarize the following code written in ${language}
      code: ${codeSent}`,
    });

    res.json({
      response: response.text,
      modelVersion: response.modelVersion,
      promptTokenCount: response.usageMetadata.promptTokenCount,
      candidatesTokenCount: response.usageMetadata.candidatesTokenCount,
      totalTokenCount: response.usageMetadata.totalTokenCount,
      thoughtsTokenCount: response.usageMetadata.thoughtsTokenCount,
    });
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.use((err, req, res, next) => {
  res.status(400).json({
    message: "internal server error ",
  });
  console.log(err);
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
