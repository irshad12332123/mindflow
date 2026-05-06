import { Response, Request } from "express";
import { configDotenv } from "dotenv";
import express from "express";
import app from "./app";

configDotenv();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("You are welcome!");
});

app.get("/get-data", (req: Request, res: Response) => {
  res.status(200).json({
    data: "This is the data you requested!",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
