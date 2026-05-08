import { taskScheduler } from "../scheduling/scheduling.service";
import { extractSubTasks } from "../task/subtask.service";
import { extractTasks } from "../task/task.service";
import { storeRawText } from "./braindump.repository";

export const orchestration = async (rawText: string, userId: string) => {
  // store the raw text in the DB
  const res = await storeRawText(rawText, userId);

  // extract the tasks
  const {
    createdTasks: extractedTasks,
    fixedConstraints,
    freeSlots,
  } = await extractTasks(rawText, res.id, userId);

  // create subtasks based on the tasks
  const { createdSubtasks, priorityOfEachTask: tasks } = await extractSubTasks(
    extractedTasks,
    fixedConstraints,
    freeSlots,
  );

  // scheduler
  const scheduledTasks = taskScheduler(
    tasks,
    createdSubtasks,
    freeSlots,
    userId,
  );
  console.log(scheduledTasks);

  return scheduledTasks;
};
