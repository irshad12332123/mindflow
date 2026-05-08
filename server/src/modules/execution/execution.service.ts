import prisma from "../../lib/prisma";
import {
  checkRemainingSubtasksRepo,
  createExecutionSessionRepo,
  createTaskLogRepo,
  getActiveSessionByScheduleRepo,
  getScheduleByIdRepo,
  getSessionByIdRepo,
  getTodaysExecutionTasksRepo,
  updateActualTimeSpentRepo,
  updateExecutionSessionRepo,
  updateScheduleStatusRepo,
  updateSubtaskStatusRepo,
  updateTaskStatusRepo,
} from "./execution.repository";

export const getTodaysExecutionTasks = async (userId: string) => {
  return getTodaysExecutionTasksRepo(userId);
};

export const startExecution = async (userId: string, scheduleId: string) => {
  const schedule = await getScheduleByIdRepo(scheduleId);
  if (!schedule) throw new Error("Schedule not found");

  // Guard: subtask must exist
  if (!schedule.subtask_id) throw new Error("Schedule has no subtask linked");

  const existingSession = await getActiveSessionByScheduleRepo(scheduleId);
  if (existingSession) return existingSession;

  const session = await createExecutionSessionRepo(
    userId,
    schedule.id,
    schedule.task_id,
    schedule.subtask_id,
  );

  await Promise.all([
    updateScheduleStatusRepo(scheduleId, "in_progress"),
    updateSubtaskStatusRepo(schedule.subtask_id, "in_progress"),
    updateTaskStatusRepo(schedule.task_id, "in_progress"),
  ]);

  return session;
};

export const pauseExecution = async (sessionId: string) => {
  const session = await getSessionByIdRepo(sessionId);
  if (!session) throw new Error("Session not found");

  if (session.session_status !== "started") {
    throw new Error("Session is not active");
  }

  // Track elapsed time before pausing
  const now = new Date();
  const elapsedMinutes = session.started_at
    ? Math.floor(
        (now.getTime() - new Date(session.started_at).getTime()) / (1000 * 60),
      )
    : 0;

  await Promise.all([
    updateExecutionSessionRepo(sessionId, {
      session_status: "paused",
      // Store accumulated time so resume doesn't double-count
      actual_duration_minutes: elapsedMinutes,
    }),
    updateScheduleStatusRepo(session.schedule_id, "paused"),
  ]);

  return { message: "Execution paused" };
};

export const resumeExecution = async (sessionId: string) => {
  const session = await getSessionByIdRepo(sessionId);
  if (!session) throw new Error("Session not found");

  if (session.session_status !== "paused") {
    throw new Error("Session is not paused");
  }

  // Reset started_at so elapsed time is measured fresh from resume
  await Promise.all([
    updateExecutionSessionRepo(sessionId, {
      session_status: "started",
      started_at: new Date(),
    }),
    updateScheduleStatusRepo(session.schedule_id, "in_progress"),
  ]);

  return { message: "Execution resumed" };
};

export const completeExecution = async (userId: string, scheduleId: string) => {
  const schedule = await getScheduleByIdRepo(scheduleId);
  if (!schedule) throw new Error("Schedule not found");
  if (!schedule.subtask_id) throw new Error("Schedule has no subtask linked");

  const activeSession = await getActiveSessionByScheduleRepo(scheduleId);

  const endTime = new Date();

  // Calculate only the current segment's elapsed time (since last start/resume)
  const currentSegmentMinutes =
    activeSession?.started_at && activeSession.session_status === "started"
      ? Math.floor(
          (endTime.getTime() - new Date(activeSession.started_at).getTime()) /
            (1000 * 60),
        )
      : 0;

  // Add previously accumulated minutes (from pause)
  const previousMinutes = activeSession?.actual_duration_minutes ?? 0;
  const totalMinutes = previousMinutes + currentSegmentMinutes;

  // Proper transaction: pass tx client into every repo call
  await prisma.$transaction(async (tx) => {
    if (activeSession) {
      await updateExecutionSessionRepo(
        activeSession.id,
        {
          ended_at: endTime,
          actual_duration_minutes: totalMinutes,
          session_status: "completed",
        },
        tx,
      );
    }

    await updateScheduleStatusRepo(scheduleId, "completed", tx);
    await updateSubtaskStatusRepo(schedule.subtask_id!, "completed", tx);
    await updateActualTimeSpentRepo(schedule.task_id, totalMinutes, tx);

    const remaining = await checkRemainingSubtasksRepo(schedule.task_id, tx);
    await updateTaskStatusRepo(
      schedule.task_id,
      remaining === 0 ? "completed" : "partially_completed",
      tx,
    );

    await createTaskLogRepo(
      userId,
      schedule.task_id,
      "completed",
      undefined,
      tx,
    );
  });

  return { message: "Task completed successfully" };
};

export const skipExecution = async (
  userId: string,
  scheduleId: string,
  reason?: string,
) => {
  const schedule = await getScheduleByIdRepo(scheduleId);
  if (!schedule) throw new Error("Schedule not found");

  await Promise.all([
    updateScheduleStatusRepo(scheduleId, "missed"),
    createTaskLogRepo(userId, schedule.task_id, "missed", reason),
  ]);

  return { message: "Task skipped successfully" };
};
