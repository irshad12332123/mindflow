import { Request, Response } from "express";
import { orchestration } from "./planningOrchestrator.service";
import { getUserId } from "../../utils/getUserId";

export const createPlanFromBrainDump = async (req: Request, res: Response) => {
  try {
    const body = typeof req.body === "object" ? req.body : {};
    const { rawText } = body as { rawText: string };
    if (!rawText) {
      return res.status(400).json({
        message: "We didn't read anything",
      });
    }

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization token missing",
      });
    }

    const token = authHeader.split(" ")[1];
    // console.log(token);

    if (!token) {
      return res.status(401).json({
        message: "Invalid token format",
      });
    }

    // call orchestrator
    const userId: string = await getUserId(token);
    console.log(`userId ${userId}`);
    const planPayload = await orchestration(rawText, userId);

    return res.status(200).json({
      message: "plan create successfully",
      payload: planPayload,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: `Something went wrong ${error.message}`,
    });
  }
};
