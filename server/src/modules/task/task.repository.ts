import prisma from "../../lib/prisma";
import { subTaskType, taskType } from "./types/task";

export const storeTasks = async (tasks: taskType[]) => {
  return await prisma.tasks.createMany({
    data: tasks,
  });
};

export const subTasks = async (subTasks: subTaskType) => {
  return await prisma.subtasks.createMany({
    data: subTasks,
  });
};
