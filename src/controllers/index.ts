import { Request, Response } from "express";

export function indexController(req: Request, res: Response) {
  res.json({ message: "Success" });
}
