import { GeminiSubtaskResponse } from "../task/types/task";


export const extractTaskPriorities = (subtasks: GeminiSubtaskResponse) => {
  const taskMap = new Map();

  for (const subtask of subtasks.tasks) {
    if (!taskMap.has(subtask.task_id)) {
      taskMap.set(subtask.task_id, subtask.priority_score);
    }
  }

  return Array.from(taskMap.entries()).map(([taskId, priority]) => ({
    taskId,
    priority,
  }));
};
