import {
  freeSlotsType,
  subTasksType,
  TaskPriorityType,
} from "../task/types/task";
import {
  allocateSubTasks,
  mapTaskPriorities,
  sortSubTaks,
} from "./scheduling.helper";
import { storeScheduledTasks } from "./scheduling.repository";

export const taskScheduler = async (
  tasks: TaskPriorityType,
  subTasks: subTasksType,
  freeSlots: freeSlotsType,
  userId: string,
) => {
  const priorityMap = new Map<string, number>();
  mapTaskPriorities(tasks, priorityMap);

  // sort the sub tasks based on parent priority
  sortSubTaks(subTasks, priorityMap);

  const { schedule } = allocateSubTasks(freeSlots, subTasks);

  // const formattedUnscheduled = remainingSubtasks.map((task) => ({
  //   task_id: task.task_id,
  //   subtask_id: task.id,
  //   title: task.title,
  //   estimated_duration_minutes: task.estimated_duration_minutes,
  //   reason: "Insufficient available time",
  // }));

  // store the scheduled tasks in db
  const storedScheduleTasks = await storeScheduledTasks(schedule, userId);
  return storedScheduleTasks;
};
