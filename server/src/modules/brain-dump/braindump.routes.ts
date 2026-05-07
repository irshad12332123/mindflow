import express from "express";
import { createPlanFromBrainDump } from "./braindump.controller";
const coreRouter = express.Router();

coreRouter.post("/generate", createPlanFromBrainDump);

export default coreRouter;
