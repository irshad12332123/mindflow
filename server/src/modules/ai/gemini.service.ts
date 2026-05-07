import { model } from "../../lib/gemini";
import { extractTasksPrompt } from "./prompts/extraction.prompt";

export const geminiService = {

  async taskExtraction(rawText: string) {
    try {
      const prompt: string = extractTasksPrompt(rawText);
      return await model.generateContent(prompt);
    } catch (error: any) {
      console.error("Gemini task extraction failed:", error.message);
      throw new Error(`Failed to extract tasks ${error.message}`);
    }
  },

  

};
