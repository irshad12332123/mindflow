import express from "express";
import cors from "cors";

import auth from "./modules/auth/auth.router";
const app = express();

app.use(cors());

app.use(express.json());

app.use("/auth/", auth);

export default app;
