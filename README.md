# AI Code Summarizer

A full-stack AI-powered application that takes in code from users, sends it to Google's Gemini API for summarization, and displays a human-readable explanation of the logic. It supports multiple languages and different Gemini models, with response metadata such as token counts and model latency.

---
## ⚙️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Fetch API
- Dark theme UI

### Backend
- Node.js
- Express.js
- Zod (for validation)
- Google GenAI SDK (Gemini API)
- dotenv
- CORS
- Express Rate Limit (for safety)

---

## 🚀 Features

- 🧠 AI-powered code summarization
- ✍️ Supports multiple programming languages
- 📈 Model selection (Gemini 2.5 Pro / Flash / Flash Lite)
- 📊 Displays model metadata:
  - Model version
  - Token counts (prompt, candidate, total, thoughts)
  - Response time in seconds
- 🌓 Dark themed, responsive UI
- 🔁 Loading animation while waiting for AI
- ✅ Input validation using Zod
- ⚠️ Rate-limiting friendly error handling
- 🐛 Friendly error UI messages on failure

---

## 🧪 Local Setup

### 1. Clone the Repository

```bash
git clone git@github.com:aradhyacp/Ai-Code-Summarizer.git
cd Ai-Code-Summarizer
```
- Frontend runs on: http://localhost:5173
- Backend runs on: http://localhost:3000

---

## 📤 API Reference

### POST /ai-summary

- Request Body:
```
{
  "language": "javascript",
  "codeSent": "function test() { return 123; }",
  "model": "gemini-2.5-flash-lite"
}
```

- Success Response:
```
{
  "response": "This function returns the number 123.",
  "modelVersion": "gemini-2.5-flash-lite",
  "promptTokenCount": 100,
  "candidatesTokenCount": 50,
  "totalTokenCount": 160,
  "thoughtsTokenCount": 10,
  "modelResponseTime": 1.48
}
```
- Validation Error Response:
```
{
  "error": "Invalid input",
  "issues": [
    { "message": "Language is required" },
    { "message": "Code is required" },
    { "message": "Model is required" }
  ]
}
```

---

## 🛡️ Error Handling

- Zod validation errors are caught and returned to frontend

- Invalid inputs or empty fields are blocked

- Rate-limiting errors show:

```Too many requests. Please try again later. Rate limiter is turned on for safety purpose, limit is 10 requests every minute.```


- Errors during fetch are shown as in-code comments like // Error message here

---
## 🧠 Tips for Usage

- Always select both Language and Model before submitting

- Code must not be empty

- Wait for the response spinner to finish before editing again

- Use Gemini Flash-lite for faster (but cheaper) summaries