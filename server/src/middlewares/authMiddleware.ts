import { Request, Response, NextFunction } from "express";
import supabase from "../lib/supabase";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email?: string;
  };
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Invalid token format",
      });
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }

    req.user = {
      id: user.id,
      email: user.email,
    };

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Authentication failed",
    });
  }
};
