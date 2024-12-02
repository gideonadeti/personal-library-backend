import { Request, Response } from "express";

import { readGenres, readGenre, createGenre } from "../../prisma/db";
import { getCache, setCache, clearCache } from "../utils/cache";

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

export async function handleGenresPost(req: Request, res: Response) {
  const { userId, name } = req.body;

  if (!userId || !name) {
    return res.status(400).json({ errMsg: "userId and name are required" });
  }

  try {
    const genre = await readGenre(userId, name.trim());

    if (genre) {
      return res.status(400).json({ errMsg: "Genre already exist" });
    }

    await createGenre(userId, name.trim());
    await clearCache(`/genres?userId=${userId}`);

    res.status(201).json({ msg: "Genre created successfully" });
  } catch (err) {
    console.error("Something went wrong while creating genre:", err);
    res
      .status(500)
      .json({ errMsg: "Something went wrong while creating genre" });
  }
}
