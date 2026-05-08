import prisma from "../../lib/prisma";
import { convertToISODateTime } from "../../utils/convertToISODateHelper";

type ScheduledTaskType = {
  task_id: string;
  subtask_id: string;
  title: string;
  start_time: string;
  end_time: string;
}[];

export const storeScheduledTasks = async (
  scheduledTasks: ScheduledTaskType,
  userId: string,
) => {
  try {
    const today = new Date();
    const scheduleDate = today.toISOString().split("T")[0];

    const formattedSchedules = scheduledTasks.map((task) => ({
      user_id: userId,
      task_id: task.task_id,
      subtask_id: task.subtask_id,

      start_time: convertToISODateTime(scheduleDate, task.start_time),

      end_time: convertToISODateTime(scheduleDate, task.end_time),

      schedule_date: new Date(`${scheduleDate}T00:00:00.000Z`),

      schedule_status: "scheduled",
    }));

    // Insert schedules
    const savedSchedules = await prisma.$transaction(
      formattedSchedules.map((schedule) =>
        prisma.daily_schedules.create({
          data: schedule,
        }),
      ),
    );

    const scheduleIds = savedSchedules.map((schedule) => schedule.id);

    // Fetch enriched schedules
    const enrichedSchedules = await prisma.daily_schedules.findMany({
      where: {
        id: {
          in: scheduleIds,
        },
      },
      include: {
        tasks: {
          select: {
            id: true,
            title: true,
          },
        },
        subtasks: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        start_time: "asc",
      },
    });

    return enrichedSchedules;
  } catch (error: any) {
    console.error("Error storing schedules:", error.message);

    throw error;
  }
};
