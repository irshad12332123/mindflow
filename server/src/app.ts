import express from "express";
import cors from "cors";
import auth from "./modules/auth/auth.router";
import coreRouter from "./modules/brain-dump/braindump.routes";
import executionRouter from "./modules/execution/execution.routes";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/execution", executionRouter);
app.use("/auth", auth);
app.use("/api", coreRouter);

export default app;
