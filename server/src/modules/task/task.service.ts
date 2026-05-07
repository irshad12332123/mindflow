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
    console.log(parsedResponse);
    const tasks: taskType[] = parsedResponse.tasks;

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

    await storeTasks(formattedTasks);

    return formattedTasks;
  } catch (error: any) {
    console.error("Error occurred while extracting tasks:", error.message);

    throw error;
  }
};
