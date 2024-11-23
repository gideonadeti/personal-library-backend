import { Request, Response } from "express";

import { readGenres } from "../../prisma/db";
import { getCache, setCache } from "../utils/cache";

export async function handleGenresGet(req: Request, res: Response) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ errMsg: "userId is required" });
  }

  try {
    const cashedGenres = await getCache(`/genres?userId=${userId}`);

    if (cashedGenres) {
      return res.json({ genres: cashedGenres });
    }

    const genres = await readGenres(userId as string);

    await setCache(`/genres?userId=${userId}`, genres);

    res.json({ genres });
  } catch (error) {
    console.error("Error reading genres:", error);
    res
      .status(500)
      .json({ errMsg: "Something went wrong while reading genres" });
  }
}
