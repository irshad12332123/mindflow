import prisma from "../../lib/prisma";
import { Prisma } from "@prisma/client";

export const getTodaysExecutionTasksRepo = async (userId: string) => {
  const today = new Date();
  const startOfDay = new Date(today);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);

  return prisma.daily_schedules.findMany({
    where: {
      user_id: userId,
      schedule_date: { gte: startOfDay, lte: endOfDay },
    },
    include: { tasks: true, subtasks: true },
    orderBy: { start_time: "asc" },
  });
};

export const createExecutionSessionRepo = async (
  userId: string,
  scheduleId: string,
  taskId: string,
  subtaskId: string,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx ?? prisma;
  return client.execution_sessions.create({
    data: {
      user_id: userId,
      schedule_id: scheduleId,
      task_id: taskId,
      subtask_id: subtaskId,
      started_at: new Date(),
      session_status: "started",
    },
  });
};

export const getScheduleByIdRepo = async (scheduleId: string) => {
  return prisma.daily_schedules.findUnique({ where: { id: scheduleId } });
};

export const getSessionByIdRepo = async (sessionId: string) => {
  return prisma.execution_sessions.findUnique({ where: { id: sessionId } });
};

export const getActiveSessionByScheduleRepo = async (scheduleId: string) => {
  return prisma.execution_sessions.findFirst({
    where: {
      schedule_id: scheduleId,
      session_status: { in: ["started", "paused"] },
    },
    orderBy: { created_at: "desc" },
  });
};

export const updateExecutionSessionRepo = async (
  sessionId: string,
  data: Prisma.execution_sessionsUpdateInput,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx ?? prisma;
  return client.execution_sessions.update({ where: { id: sessionId }, data });
};

export const updateScheduleStatusRepo = async (
  scheduleId: string,
  status: string,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx ?? prisma;
  return client.daily_schedules.update({
    where: { id: scheduleId },
    data: { schedule_status: status },
  });
};

export const updateSubtaskStatusRepo = async (
  subtaskId: string,
  status: string,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx ?? prisma;
  return client.subtasks.update({ where: { id: subtaskId }, data: { status } });
};

export const updateTaskStatusRepo = async (
  taskId: string,
  status: string,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx ?? prisma;
  return client.tasks.update({ where: { id: taskId }, data: { status } });
};

export const checkRemainingSubtasksRepo = async (
  taskId: string,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx ?? prisma;
  return client.subtasks.count({
    where: { task_id: taskId, status: { not: "completed" } },
  });
};

export const updateActualTimeSpentRepo = async (
  taskId: string,
  minutes: number,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx ?? prisma;
  const task = await client.tasks.findUnique({ where: { id: taskId } });
  return client.tasks.update({
    where: { id: taskId },
    data: {
      actual_time_spent_minutes:
        (task?.actual_time_spent_minutes || 0) + minutes,
    },
  });
};

export const createTaskLogRepo = async (
  userId: string,
  taskId: string,
  actionType: string,
  notes?: string,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx ?? prisma;
  return client.task_logs.create({
    data: { user_id: userId, task_id: taskId, action_type: actionType, notes },
  });
};
