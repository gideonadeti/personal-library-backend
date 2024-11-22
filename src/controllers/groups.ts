import { Request, Response } from "express";

import { readGroups, createGroup, readGroup } from "../../prisma/db";
import { clearCache, getCache, setCache } from "../utils/cache";

export async function handleGroupsGet(req: Request, res: Response) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ errMsg: "userId is required" });
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
      .json({ errMsg: "Something went wrong while reading groups" });
  }
}

export async function handleGroupsPost(req: Request, res: Response) {
  const { userId, name } = req.body;

  if (!userId || !name) {
    return res.status(400).json({ errMsg: "userId and name are required" });
  }

  try {
    const group = await readGroup(userId, name.trim());

    if (group) {
      return res.status(400).json({ errMsg: "Group already exist" });
    }

    await createGroup(userId, name.trim());
    await clearCache(`/groups?userId=${userId}`);

    res.status(201).json({ msg: "Group created successfully" });
  } catch (err) {
    console.error("Something went wrong while creating group:", err);

    res
      .status(500)
      .json({ errMsg: "Something went wrong while creating group" });
  }
}
