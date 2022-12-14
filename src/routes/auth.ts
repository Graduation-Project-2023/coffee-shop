import express, { Request, Response } from "express";
import { CustomerRepo } from "../db/customers";
import * as crud from "../common/crud";
import bcrypt from "bcrypt";
import { UserRepo } from "../db/users";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const customerRepo = new CustomerRepo();
const userRepo = new UserRepo();

const router = express.Router();

const isValidPassword = async (req: Request, res: Response, next: Function) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).send("Password is required");
  }
  if (password.length < 8) {
    return res.status(400).send("Password must be at least 8 characters");
  }
  return next();
};

const hashPassword = async (req: Request, res: Response, next: Function) => {
  const { password } = req.body;
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(password, salt);
  return next();
};

const signup = async (req: Request, res: Response, next: Function) => {
  try {
    const user = await userRepo.create(req.body);
    req.user = {
      ...user,
      unhashedPassword: req.body.password,
    };
    return next();
  } catch (error: any) {
    return next(error);
  }
};

const findCustomer = async (req: Request, res: Response, next: Function) => {
  const { username, password } = req.body;
  try {
    const user = await userRepo.read({
      username,
    });
    if (!user || !user.customer) {
      return res.status(400).send("Invalid username or password");
    }
    const { customer, ...userData } = user;
    req.user = {
      ...user,
      unhashedPassword: password,
    };
    return next();
  } catch (error: any) {
    return next(error);
  }
};

const findAdmin = async (req: Request, res: Response, next: Function) => {
  const { username, password } = req.body;
  try {
    const user = await userRepo.read({
      username,
    });
    if (!user || user.customer || user.role !== "ADMIN") {
      return res.status(400).send("Invalid username or password");
    }
    req.user = {
      ...user,
      unhashedPassword: password,
    };
    return next();
  } catch (error: any) {
    return next(error);
  }
};

const validatePassword = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const { password, unhashedPassword } = req.user;
  const validPassword = await bcrypt.compare(unhashedPassword, password);
  if (!validPassword) {
    return res.status(400).send("Invalid username or password");
  }
  return next();
};

const login = async (req: Request, res: Response) => {
  const { id, username, role } = req.user;
  const token = jwt.sign({ id, username, role }, process.env.JWT_SECRET!);
  return res.status(200).send({ token });
};

router
  .post("/signup", isValidPassword, hashPassword, signup, login)
  .post("/login", findCustomer, validatePassword, login)
  .post("/admin/login", findAdmin, validatePassword, login);

export default router;
