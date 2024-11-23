import { Request, Response } from "express";

import { readAuthors, createAuthor, readAuthor } from "../../prisma/db";
import { getCache, setCache, clearCache } from "../utils/cache";

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

export async function handleAuthorsPost(req: Request, res: Response) {
  const { userId, name, description } = req.body;

  if (!userId || !name) {
    return res.status(400).json({ errMsg: "userId and name are required" });
  }

  try {
    const author = await readAuthor(userId, name.trim());

    if (author) {
      return res.status(400).json({ errMsg: "Author already exist" });
    }

    await createAuthor(userId, name.trim(), description.trim());
    await clearCache(`/authors?userId=${userId}`);

    res.status(201).json({ msg: "Author created successfully" });
  } catch (err) {
    console.error("Something went wrong while creating author:", err);
    res
      .status(500)
      .json({ errMsg: "Something went wrong while creating author" });
  }
}
