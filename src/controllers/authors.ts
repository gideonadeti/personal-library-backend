import { Request, Response } from "express";

import { readAuthors } from "../../prisma/db";
import { getCache, setCache } from "../utils/cache";

export async function handleAuthorsGet(req: Request, res: Response) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ errMsg: "userId is required" });
  }

  try {
    const cashedAuthors = await getCache(`/authors?userId=${userId}`);

    if (cashedAuthors) {
      return res.json({ authors: cashedAuthors });
    }

    const authors = await readAuthors(userId as string);

    await setCache(`/authors?userId=${userId}`, authors);

    res.json({ authors });
  } catch (error) {
    console.error("Error reading authors:", error);

    res
      .status(500)
      .json({ errMsg: "Something went wrong while reading authors" });
  }
}
