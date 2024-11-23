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

export async function createGroup(userId: string, name: string) {
  try {
    await prismaClient.group.create({
      data: {
        userId: userId,
        name: name,
      },
    });
  } catch (err) {
    console.error("Error creating group:", err);

    throw err;
  }
}

export async function readGroup(userId: string, name: string) {
  try {
    const group = await prismaClient.group.findFirst({
      where: {
        userId,
        name,
      },
    });

    return group;
  } catch (err) {
    console.error("Error reading group:", err);

    throw err;
  }
}

export async function updateGroup(groupId: string, name: string) {
  try {
    await prismaClient.group.update({
      where: {
        id: groupId,
      },
      data: {
        name,
      },
    });
  } catch (err) {
    console.error("Error updating group:", err);

    throw err;
  }
}

export async function deleteGroup(groupId: string) {
  try {
    await prismaClient.group.delete({
      where: {
        id: groupId,
      },
    });
  } catch (err) {
    console.error("Error deleting group:", err);

    throw err;
  }
}

export async function readAuthors(userId: string) {
  try {
    const authors = await prismaClient.author.findMany({
      where: {
        userId: userId,
      },
    });

    return authors;
  } catch (err) {
    console.error("Error reading authors:", err);

    throw err;
  }
}

export async function createAuthor(
  userId: string,
  name: string,
  description: string
) {
  try {
    await prismaClient.author.create({
      data: {
        userId,
        name,
        description,
      },
    });
  } catch (err) {
    console.error("Error creating author:", err);

    throw err;
  }
}

export async function readAuthor(userId: string, name: string) {
  try {
    const author = await prismaClient.author.findFirst({
      where: {
        userId,
        name,
      },
    });

    return author;
  } catch (err) {
    console.error("Error reading author:", err);

    throw err;
  }
}

export async function readGenres(userId: string) {
  try {
    const genres = await prismaClient.genre.findMany({
      where: {
        userId: userId,
      },
    });

    return genres;
  } catch (err) {
    console.error("Error reading genres:", err);

    throw err;
  }
}
