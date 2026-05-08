import { Request, Response } from "express";
import { getUserId } from "../../utils/getUserId";
import {
  completeExecution,
  getTodaysExecutionTasks,
  pauseExecution,
  resumeExecution,
  skipExecution,
  startExecution,
} from "./execution.service";

export const getTodayTasksController = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const userId = await getUserId(token);
    const tasks = await getTodaysExecutionTasks(userId);
    return res.status(200).json(tasks);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const startExecutionController = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const userId = await getUserId(token);
    const { scheduleId } = req.params;
    const result = await startExecution(userId, scheduleId as string);
    return res.status(200).json(result);
  } catch (error: any) {
    const status = error.message.includes("not found") ? 404 : 500;
    return res.status(status).json({ message: error.message });
  }
};

export const pauseExecutionController = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const result = await pauseExecution(sessionId as string);
    return res.status(200).json(result);
  } catch (error: any) {
    const status = error.message.includes("not found") ? 404 : 500;
    return res.status(status).json({ message: error.message });
  }
};

export const resumeExecutionController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { sessionId } = req.params;
    const result = await resumeExecution(sessionId as string);
    return res.status(200).json(result);
  } catch (error: any) {
    const status = error.message.includes("not found") ? 404 : 500;
    return res.status(status).json({ message: error.message });
  }
};

export const completeExecutionController = async (
  req: Request,
  res: Response,
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const userId = await getUserId(token);
    const { scheduleId } = req.params;
    const result = await completeExecution(userId, scheduleId as string);
    return res.status(200).json(result);
  } catch (error: any) {
    const status = error.message.includes("not found") ? 404 : 500;
    return res.status(status).json({ message: error.message });
  }
};

export const skipExecutionController = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const userId = await getUserId(token);
    const { scheduleId } = req.params;
    const { reason } = req.body;
    const result = await skipExecution(userId, scheduleId as string, reason);
    return res.status(200).json(result);
  } catch (error: any) {
    const status = error.message.includes("not found") ? 404 : 500;
    return res.status(status).json({ message: error.message });
  }
};
