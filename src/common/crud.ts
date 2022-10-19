import { Request, Response } from "express";
import { nextTick } from "process";
import IRepo from "../db/repo";

export const create = (repo: IRepo) => {
  return async (req: Request, res: Response, next: Function) => {
    const { body } = req;
    try {
      const data = await repo.create(body);
      res.status(201).json(data);
    } catch (error: any) {
      return next(error);
    }
  };
};

export const read = (repo: IRepo) => {
  return async (req: Request, res: Response, next: Function) => {
    const { id } = req.params;
    try {
      const data = await repo.read({
        id,
      });
      if (!data) {
        throw new Error("Resource not found");
      }
      res.status(200).json(data);
    } catch (error: any) {
      return next(error);
    }
  };
};

export const readAll = (repo: IRepo) => {
  return async (req: Request, res: Response, next: Function) => {
    try {
      const data = await repo.readAll();
      res.status(200).json(data);
    } catch (error: any) {
      return next(error);
    }
  };
};

export const update = (repo: IRepo) => {
  return async (req: Request, res: Response, next: Function) => {
    const { id } = req.params;
    const { body } = req;
    try {
      const data = await repo.update(
        {
          id,
        },
        body
      );
      res.status(200).json(data);
    } catch (error: any) {
      return next(error);
    }
  };
};

export const remove = (repo: IRepo) => {
  return async (req: Request, res: Response, next: Function) => {
    const { id } = req.params;
    try {
      const data = await repo.delete({
        id,
      });
      res.status(200).json(data);
    } catch (error: any) {
      return next(error);
    }
  };
};
