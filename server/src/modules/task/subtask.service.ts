import { cleanResponse } from "../../utils/cleanResponse";
import { extractTaskPriorities } from "../../utils/getPriorityOfEachTask";
import { geminiService } from "../ai/gemini.service";
import { storeSubTasks } from "./subtask.repository";
import { updateTaskPriorityColumn } from "./task.repository";
import {
  fixedConstraintsType,
  freeSlotsType,
  GeminiSubtaskResponse,
  TaskPriorityType,
  taskType,
} from "./types/task";

export const extractSubTasks = async (
  extractedTasks: taskType[],
  fixedConstraints: fixedConstraintsType,
  freeSlots: freeSlotsType,
) => {
  try {
    const result = await geminiService.subtaskExtraction(
      extractedTasks,
      fixedConstraints,
      freeSlots,
    );

    const response = result.response;
    const subtasks: GeminiSubtaskResponse = cleanResponse(response.text());
    console.log(subtasks);

    const priorityOfEachTask: TaskPriorityType =
      extractTaskPriorities(subtasks);

      // update the task priority
    await updateTaskPriorityColumn(priorityOfEachTask);

    // store subtasks in the repo
    const createdSubtasks = await storeSubTasks(subtasks);
    return createdSubtasks;
  } catch (error: any) {
    console.error("Error occurred while extracting tasks:", error.message);
    throw error;
  }
};
