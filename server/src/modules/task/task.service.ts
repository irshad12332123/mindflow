import { cleanResponse } from "../../utils/cleanResponse";
import { geminiService } from "../ai/gemini.service";
import { storeTasks } from "./task.repository";
import { taskType } from "./types/task";

export const extractTasks = async (
  rawText: string,
  rawTextId: string,
  userId: string,
) => {
  try {
    const result = await geminiService.taskExtraction(rawText);

    const response = result.response;

    const parsedResponse = cleanResponse(response.text());
    
    const tasks: taskType[] = parsedResponse.tasks;
    const fixedConstraints = parsedResponse.fixed_commitments;
    const freeSlots = parsedResponse.free_slots;

    const formattedTasks = tasks.map((task) => ({
      title: task.title,
      task_type: task.task_type,
      deadline: task.deadline,
      estimated_duration_minutes: task.estimated_duration_minutes,
      priority_score: null,
      recommended_time_minutes: null,
      status: "pending",
      brain_dump_id: rawTextId,
      user_id: userId,
    }));

    const createdTasks = await storeTasks(formattedTasks);

    return { createdTasks, fixedConstraints, freeSlots };
  } catch (error: any) {
    console.error("Error occurred while extracting tasks:", error.message);

    throw error;
  }
};
