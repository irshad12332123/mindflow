import { extractTasks } from "../task/task.service";
import { storeRawText } from "./braindump.repository";

export const orchestration = async (rawText: string, userId: string) => {
  // store the raw text in the DB
  const res = await storeRawText(rawText, userId);

  // extract the tasks
  const tasks = await extractTasks(rawText, res.id, userId);
  console.log(`Extracted Tasks: ${tasks}`);
  return tasks;
};
