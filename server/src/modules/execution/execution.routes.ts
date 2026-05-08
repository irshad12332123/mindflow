import express from "express";
import {
  completeExecutionController,
  getTodayTasksController,
  pauseExecutionController,
  resumeExecutionController,
  skipExecutionController,
  startExecutionController,
} from "./execution.controller";

const executionRouter = express.Router();

executionRouter.get("/today", getTodayTasksController);
executionRouter.post("/start/:scheduleId", startExecutionController);
executionRouter.post("/pause/:sessionId", pauseExecutionController);
executionRouter.post("/resume/:sessionId", resumeExecutionController);
executionRouter.post("/complete/:scheduleId", completeExecutionController);
executionRouter.post("/skip/:scheduleId", skipExecutionController);

export default executionRouter;
