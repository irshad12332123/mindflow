import { Router } from "express";
import { login, register } from "./auth.controllers";

const auth = Router();

auth.post("/login", login);
auth.post("/register", register);

export default auth;
