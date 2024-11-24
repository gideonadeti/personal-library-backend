import { Request, Response } from "express";

import { readBooks } from "../../prisma/db";
import { getCache, setCache } from "../utils/cache";

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