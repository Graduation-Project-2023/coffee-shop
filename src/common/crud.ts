import { Request, Response } from "express";
import IRepo from "../db/repo";

export const create = (repo: IRepo) => {
  return async (req: Request, res: Response) => {
    const { body } = req;
    try {
      const data = await repo.create(body);
      res.status(201).json(data);
    } catch (error) {
      res.status(400).json({ error });
    }
  };
};

export const read = (repo: IRepo) => {
  return async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const data = await repo.read(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ error });
    }
  };
};

export const readAll = (repo: IRepo) => {
  return async (req: Request, res: Response) => {
    try {
      const data = await repo.readAll();
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ error });
    }
  };
};

export const update = (repo: IRepo) => {
  return async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
      const data = await repo.update(id, body);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ error });
    }
  };
};

export const remove = (repo: IRepo) => {
  return async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const data = await repo.delete(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ error });
    }
  };
};
