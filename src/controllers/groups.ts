import { Request, Response } from "express";

import { readGroups } from "../../prisma/db";
import { getCache, setCache } from "../utils/cache";

export async function handleGroupsGet(req: Request, res: Response) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ ErrMsg: "userId is required" });
  }

  try {
    const cashedGroups = await getCache(`/groups?userId=${userId}`);

    if (cashedGroups) {
      return res.json({ groups: cashedGroups });
    }

    const groups = await readGroups(userId as string);

    await setCache(`/groups?userId=${userId}`, groups);

    res.json({ groups });
  } catch (error) {
    console.error("Error reading groups:", error);

    res
      .status(500)
      .json({ ErrMsg: "Something went wrong while reading groups" });
  }
}
