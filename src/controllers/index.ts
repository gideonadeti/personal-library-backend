import { Request, Response } from "express";

import { readGroups } from "../../prisma/db";
import { getCache, setCache } from "../utils/cache";

export async function indexController(req: Request, res: Response) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ ErrMsg: "userId is required" });
  }

  try {
    const cashedGroups = await getCache(userId as string);

    if (cashedGroups) {
      return res.json(cashedGroups);
    }

    const groups = await readGroups(userId as string);

    await setCache(userId as string, groups);

    res.json(groups);
  } catch (err) {
    console.error("Error reading groups:", err);

    res
      .status(500)
      .json({ ErrMsg: "Something went wrong while reading groups" });
  }
}
