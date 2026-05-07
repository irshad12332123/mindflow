import prisma from "../../lib/prisma";
import { GeminiSubtaskResponse } from "./types/task";

export const storeSubTasks = async (subTaskResponse: GeminiSubtaskResponse) => {
  try {
    const formattedSubTasks = subTaskResponse.tasks.flatMap((taskGroup) =>
      taskGroup.subtasks.map((subtask) => ({
        task_id: taskGroup.task_id,
        title: subtask.title,
        estimated_duration_minutes: subtask.estimated_duration_minutes,
        status: "pending",
      })),
    );

    if (formattedSubTasks.length === 0) {
      return [];
    }

    const createdSubTasks = await prisma.$transaction(
      formattedSubTasks.map((subtask) =>
        prisma.subtasks.create({
          data: subtask,
        }),
      ),
    );

    return createdSubTasks;
  } catch (error: any) {
    console.error("Error storing subtasks:", error.message);
    throw error;
  }
};
