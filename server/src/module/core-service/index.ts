// import { generateSubTasks, generateTasks } from "./reasoning/reasoning.service";

// export const breakIntoTasks = async (req: Request, _res: Response) => {
//   const body = typeof req.body === "object" ? req.body : {};

//   const { query } = body;

//   try {

//     //  parse the tasks from the query
//     const tasks = await generateTasks(query);

//     // parse the subtasks for each task
//     const subTasks = await generateSubTasks(tasks);

//     /*
//     cealculate the free time of the user
//     if user didn't entered any time please ask him to specify the free hours
//     */


//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };
