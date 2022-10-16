import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { attachUserToRequest, getTokenFromRequest } from "./utils";
dotenv.config();

export const resourceNotFound = (req: Request, res: Response) => {
  res.status(404).json({ error: "Resource not found" });
};

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: Function
) => {
  const token = getTokenFromRequest(req);
  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }
  try {
    req = attachUserToRequest(req, token);
    next();
  } catch (error) {
    return res.status(400).json({ error: "Invalid token" });
  }
};

export const validateSameUser = (
  req: Request,
  res: Response,
  next: Function
) => {
  const { id } = req.params;
  const { user } = req;
  if (user.id !== id) {
    return res.status(401).json({ error: "Access denied" });
  }
  next();
};

export const isAdmin = (req: Request, res: Response, next: Function) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ error: "Access denied" });
  }
  next();
};
