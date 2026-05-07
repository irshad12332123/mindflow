import { Request, Response } from "express";
import { verifyLogin, verifyRegister } from "./auth.service";
import { verifyFields } from "./auth.validator";
import { VerifyUser } from "./types/auth";

// login controller
export const login = async (req: Request, res: Response) => {
  const body = typeof req.body === "object" ? req.body : {};
  const { email, password } = body as VerifyUser;

  //verify the fieldsj
  if (!verifyFields(email, password)) {
    return res.status(400).json({
      message: `please enter the required fields ${req.body}`,
    });
  }

  try {
    const data = await verifyLogin(email, password);
    return res.status(200).json({
      message: "Login succesfull",
      user: data.user,
      session: data.session,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// register controller
export const register = async (req: Request, res: Response) => {
  console.log(req.body);
  const body = typeof req.body === "object" ? req.body : {};
  const { email, password } = body as VerifyUser;
  // verifying the fields
  if (!verifyFields(email, password)) {
    return res.status(400).json({
      message: `please enter the required fields ${req.body}`,
    });
  }
  try {
    const data = await verifyRegister(email, password);
    return res.status(201).json({
      message: "User registered successfully",
      user: data.user,
      session: data.session,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
