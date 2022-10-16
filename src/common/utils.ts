import { Request } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const getTokenFromRequest = (req: Request): string | undefined => {
  const token = req.header("Authorization")?.split(" ")[1];
  return token;
};

export const getDecodedUser = (req: Request, token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded;
  } catch (error) {
    throw error;
  }
};
