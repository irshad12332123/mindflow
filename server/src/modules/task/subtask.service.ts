// import { cleanResponse } from "../../utils/cleanResponse";
// import { geminiService } from "../ai/gemini.service";
// import { storeTasks } from "./task.repository";
// import { subTaskType } from "./types/task";

// export const extractTasks = async (
//   rawText: string,
//   rawTextId: string,
//   userId: string,
// ) => {
//   try {

//     const result = await geminiService.taskExtraction(rawText);
//     const response = result.response;
//     const tasks: subTaskType[] = cleanResponse(response.text());

//     const formattedTasks = tasks.map((task) => ({
//       ...task,
//       brain_dump_id: rawTextId,
//       user_id: userId,
//     }));

//     // store the tasks in DB
//     await storeTasks(formattedTasks);

//     return formattedTasks;
//   } catch (error: any) {
//     console.error("Error occurred while extracting tasks:", error.message);
//     throw error;
//   }
// };
