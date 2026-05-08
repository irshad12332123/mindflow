import prisma from "../../lib/prisma";

export const getTodaysExecutionTasks = async (userId: string) => {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));

  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  return await prisma.daily_schedules.findMany({
    where: {
      user_id: userId,
      schedule_date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    include: {
      tasks: true,
      subtasks: true,
    },
    orderBy: {
      start_time: "asc",
    },
  });
};

export const markScheduleCompleted = async (scheduleId: string) => {
  return await prisma.daily_schedules.update({
    where: {
      id: scheduleId,
    },
    data: {
      schedule_status: "completed",
    },
  });
};

export const markSubtaskCompleted = async (subtaskId: string) => {
  return await prisma.subtasks.update({
    where: {
      id: subtaskId,
    },
    data: {
      status: "completed",
    },
  });
};

export const checkAllSubtasksCompleted = async (taskId: string) => {
  const remaining = await prisma.subtasks.count({
    where: {
      task_id: taskId,
      status: {
        not: "completed",
      },
    },
  });

  return remaining === 0;
};

export const markTaskCompleted = async (taskId: string) => {
  return await prisma.tasks.update({
    where: {
      id: taskId,
    },
    data: {
      status: "completed",
    },
  });
};
