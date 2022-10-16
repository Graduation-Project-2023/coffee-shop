// prisma crud functionality
import { Request, Response } from "express";

export const create = (prismaCreate: Function) => {
  return async (req: Request, res: Response) => {
    const { body } = req;
    try {
      const data = await prismaCreate({
        data: body,
      });
      res.status(201).json(data);
    } catch (error) {
      res.status(400).json({ error });
    }
  };
};

export const read = (prismaRead: Function) => {
  return async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const data = await prismaRead({
        where: { id: id },
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ error });
    }
  };
};

export const readAll = (prismaReadAll: Function) => {
  return async (req: Request, res: Response) => {
    try {
      const data = await prismaReadAll();
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ error });
    }
  };
};

export const update = (prismaUpdate: Function) => {
  return async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
      const data = await prismaUpdate({
        where: { id: id },
        data: body,
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ error });
    }
  };
};

export const remove = (prismaRemove: Function) => {
  return async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const data = await prismaRemove({
        where: { id: id },
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ error });
    }
  };
};
