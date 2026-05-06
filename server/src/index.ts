import dotenv from "dotenv";
import express from "express";
import app from "./app";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
