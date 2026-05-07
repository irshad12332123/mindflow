import { model } from "../../lib/gemini";
import {
  fixedConstraintsType,
  freeSlotsType,
  taskType,
} from "../task/types/task";
import { subTaskPrompt } from "./prompts/decomposition.prompt";
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

  async subtaskExtraction(
    extractedTask: taskType[],
    fixedConstraints: fixedConstraintsType,
    freeSlots: freeSlotsType,
  ) {
    try {
      const prompt: string = subTaskPrompt(extractedTask, fixedConstraints, freeSlots);
      return await model.generateContent(prompt);
    } catch (error: any) {
      console.error("Gemini task extraction failed:", error.message);
      throw new Error(`Failed to extract tasks ${error.message}`);
    }
  },
};
