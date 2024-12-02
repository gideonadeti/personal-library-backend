import { Request, Response } from "express";

import { readNote, createNote } from "../../prisma/db";
import { clearCache } from "../utils/cache";

export async function handleNotesPost(req: Request, res: Response) {
  const { userId, bookId, content } = req.body;

  if (!userId || !bookId) {
    return res.status(400).json({ errMsg: "userId and bookId are required" });
  }

  try {
    const note = await readNote(userId, bookId, content.trim());

    if (note) {
      return res.status(400).json({ errMsg: "Note already exist" });
    }

    await createNote(userId, bookId, content.trim());
    await clearCache(`/books?userId=${userId}`);

    res.status(201).json({ msg: "Note created successfully" });
  } catch (err) {
    console.error("Something went wrong while creating note:", err);
    res
      .status(500)
      .json({ errMsg: "Something went wrong while creating note" });
  }
}
