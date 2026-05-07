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
  const createdSubTasks = await extractSubTasks(
    extractedTasks,
    fixedConstraints,
    freeSlots,
  );

  console.log(createdSubTasks);

  return createdSubTasks;
  // calculate free slots
};
