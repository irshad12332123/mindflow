import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const model = ai.getGenerativeModel({
  model: process.env.GEMINI_MODEL_NAME!,
});
