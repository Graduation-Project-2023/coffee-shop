import {
  resourceNotFound,
  isAuthenticated,
  validateSameUser,
  isAdmin,
} from "../common/middleware";
import supertest from "supertest";
import express, { Request, Response } from "express";
import { expect } from "chai";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const app = express();

const request = supertest(app);

const mockAuth = (req: Request, res: Response, next: Function) => {
  const { id, role } = req.body;
  if (id && role) {
    const token = jwt.sign({ id, role }, process.env.JWT_SECRET!);
    req.headers.authorization = `Bearer ${token}`;
  }
  next();
};

app
  .use(express.json())
  .post("/notFound", resourceNotFound)
  .post("/isAuthenticated", mockAuth, isAuthenticated, resourceNotFound)
  .post(
    "/validateSameUser/:userId",
    mockAuth,
    isAuthenticated,
    validateSameUser,
    resourceNotFound
  )
  .post("/isAdmin", mockAuth, isAuthenticated, isAdmin, resourceNotFound);

const test = (
  funcStr: string,
  id: string | null = null,
  role: string | null = null
) => {
  return request.post(`/${funcStr}`).send({
    id: id,
    role: role,
  });
};

describe("middleware", () => {
  describe("resourceNotFound", () => {
    it("should return 404", async () => {
      const res = await test("notFound");
      expect(res.status).to.equal(404);
    });
  });

  describe("isAuthenticated", () => {
    it("should return 401", async () => {
      const res = await test("isAuthenticated");
      expect(res.status).to.equal(401);
    });

    it("should return 404", async () => {
      const res = await test("isAuthenticated", "1", "ADMIN");
      expect(res.status).to.equal(404);
    });
  });

  describe("validateSameUser", () => {
    it("should return 401", async () => {
      const res = await test("validateSameUser/1");
      expect(res.status).to.equal(401);
    });

    it("should return 401", async () => {
      const res = await test("validateSameUser/1", "2", "ADMIN");
      expect(res.status).to.equal(401);
    });

    it("should return 404", async () => {
      const res = await test("validateSameUser/1", "1", "ADMIN");
      expect(res.status).to.equal(404);
    });
  });

  describe("isAdmin", () => {
    it("should return 401", async () => {
      const res = await test("isAdmin");
      expect(res.status).to.equal(401);
    });

    it("should return 403", async () => {
      const res = await test("isAdmin", "1", "CUSTOMER");
      expect(res.status).to.equal(403);
    });

    it("should return 404", async () => {
      const res = await test("isAdmin", "1", "ADMIN");
      expect(res.status).to.equal(404);
    });
  });
});
