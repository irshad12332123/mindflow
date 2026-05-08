import { convertMinutesToTime } from "../../utils/convertToTimeHelper";
import { convertToMinutes } from "../ai/prompts/priority.prompt";
import {
  freeSlotsType,
  subTasksType,
  TaskPriorityType,
} from "../task/types/task";

export const mapTaskPriorities = (
  tasks: TaskPriorityType,
  priorityMap: Map<string, number>,
) => {
  tasks.forEach((task) => {
    priorityMap.set(task.taskId, task.priority);
  });
};

export const sortSubTaks = (
  subtasks: subTasksType,
  priorityMap: Map<string, number>,
) => {
  subtasks.sort((a, b) => {
    return priorityMap.get(b.task_id)! - priorityMap.get(a.task_id)!;
  });
};

export const allocateSubTasks = (
  freeSlots: freeSlotsType,
  subtasks: subTasksType,
) => {
  const schedule = [];
  const remainingSubtasks = [...subtasks];

  for (const slot of freeSlots) {
    let currentTime = convertToMinutes(slot.start_time);

    const slotEnd = convertToMinutes(slot.end_time);

    while (remainingSubtasks.length > 0 && currentTime < slotEnd) {
      const currentSubtask = remainingSubtasks[0];

      const duration = currentSubtask.estimated_duration_minutes;

      if (duration && currentTime + duration <= slotEnd) {
        schedule.push({
          task_id: currentSubtask.task_id,
          subtask_id: currentSubtask.id,
          title: currentSubtask.title,
          start_time: convertMinutesToTime(currentTime),
          end_time: convertMinutesToTime(currentTime + duration),
        });
        currentTime += duration;
        remainingSubtasks.shift();
      } else {
        break;
      }
    }
  }
  return { schedule, remainingSubtasks };
};
