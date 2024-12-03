import { Request, Response } from "express";

import {
  readAuthors,
  createAuthor,
  readAuthor,
  updateAuthor,
  deleteAuthor,
} from "../../prisma/db";
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
  const { userId, name } = req.body;

  if (!userId || !name) {
    return res.status(400).json({ errMsg: "userId and name are required" });
  }

  try {
    const author = await readAuthor(userId, name.trim());

    if (author) {
      return res.status(400).json({ errMsg: "Author already exist" });
    }

    await createAuthor(userId, name.trim());
    await clearCache(`/authors?userId=${userId}`);

    res.status(201).json({ msg: "Author created successfully" });
  } catch (err) {
    console.error("Something went wrong while creating author:", err);
    res
      .status(500)
      .json({ errMsg: "Something went wrong while creating author" });
  }
}

export async function handleAuthorsPut(req: Request, res: Response) {
  const { authorId } = req.params;
  const { userId, name } = req.body;

  if (!authorId || !userId || !name) {
    return res
      .status(400)
      .json({ errMsg: "authorId, userId and name are required" });
  }

  try {
    const author = await readAuthor(userId, name.trim());

    if (author) {
      return res.status(400).json({ errMsg: "Author already exist" });
    }

    await updateAuthor(authorId, name.trim());
    await clearCache(`/authors?userId=${userId}`);
    await clearCache(`/books?userId=${userId}`);

    res.json({ msg: "Author updated successfully" });
  } catch (err) {
    console.error("Something went wrong while updating author:", err);
    res
      .status(500)
      .json({ errMsg: "Something went wrong while updating author" });
  }
}

export async function handleAuthorsDelete(req: Request, res: Response) {
  const { authorId } = req.params;
  const { userId } = req.query;

  if (!authorId || !userId) {
    return res.status(400).json({ errMsg: "authorId and userId are required" });
  }

  try {
    await deleteAuthor(authorId);
    await clearCache(`/authors?userId=${userId}`);
    await clearCache(`/groups?userId=${userId}`);
    await clearCache(`/books?userId=${userId}`);
    await clearCache(`/genres?userId=${userId}`);

    res.json({ msg: "Author deleted successfully" });
  } catch (err) {
    console.error("Something went wrong while deleting author:", err);
    res
      .status(500)
      .json({ errMsg: "Something went wrong while deleting author" });
  }
}
