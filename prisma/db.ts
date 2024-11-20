import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export async function readGroups(userId: string) {
  try {
    const groups = await prismaClient.group.findMany({
      where: {
        userId: userId,
      },
    });

    if (groups.length === 0) {
      const group = await prismaClient.group.create({
        data: {
          userId: userId,
          name: "All Books",
          default: true,
        },
      });

      return [group];
    }

    return groups;
  } catch (err) {
    console.error("Error reading groups:", err);

    throw err;
  }
}
