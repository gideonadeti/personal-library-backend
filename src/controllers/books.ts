import { Request, Response } from "express";

import { readBooks, readBook, createBook } from "../../prisma/db";
import { getCache, setCache, clearCache } from "../utils/cache";

export async function handleBooksGet(req: Request, res: Response) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ errMsg: "userId is required" });
  }

  try {
    const cashedBooks = await getCache(`/books?userId=${userId}`);

    if (cashedBooks) {
      return res.json({ books: cashedBooks });
    }

    const books = await readBooks(userId as string);

    await setCache(`/books?userId=${userId}`, books);

    res.json({ books });
  } catch (error) {
    console.error("Error reading books:", error);
    res
      .status(500)
      .json({ errMsg: "Something went wrong while reading books" });
  }
}

export async function handleBooksPost(req: Request, res: Response) {
  const { userId, title, description, groupId, authorId, genreIds } = req.body;

  if (!userId || !title || !groupId) {
    return res
      .status(400)
      .json({ errMsg: "userId, title, and groupId are required" });
  }

  try {
    const book = await readBook(userId, title, groupId, authorId);

    if (book) {
      return res.status(400).json({ errMsg: "Book already exist" });
    }

    await createBook(
      userId,
      title.trim(),
      description.trim(),
      groupId,
      authorId,
      genreIds
    );
    await clearCache(`/books?userId=${userId}`);
    await clearCache(`/groups?userId=${userId}`);
    await clearCache(`/authors?userId=${userId}`);
    genreIds.length > 0 && await clearCache(`/genres?userId=${userId}`);

    res.status(201).json({ msg: "Book created successfully" });
  } catch (err) {
    console.error("Something went wrong while creating book:", err);
    res
      .status(500)
      .json({ errMsg: "Something went wrong while creating book" });
  }
}
