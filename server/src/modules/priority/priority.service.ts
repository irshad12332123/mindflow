import { GeminiSubtaskResponse } from "../task/types/task";
import { extractTaskPriorities } from "./priority.helper";

export const getPriorityForEachTask = (subtasks: GeminiSubtaskResponse) => {
  return extractTaskPriorities(subtasks);
};
