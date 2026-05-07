import prisma from "../../lib/prisma";
import { TaskPriorityType, taskType } from "./types/task";

export const storeTasks = async (tasks: taskType[]) => {
  return await prisma.$transaction(
    tasks.map((task) =>
      prisma.tasks.create({
        data: task,
      }),
    ),
  );
};

export const updateTaskPriorityColumn = async (
  taskPriorities: TaskPriorityType,
) => {
  const queries = taskPriorities.map((task) =>
    prisma.tasks.update({
      where: {
        id: task.taskId,
      },
      data: {
        priority_score: task.priority,
      },
    }),
  );

  return await prisma.$transaction(queries);
};
