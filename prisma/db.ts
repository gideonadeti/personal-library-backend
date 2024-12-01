import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export async function readGroups(userId: string) {
  try {
    const groups = await prismaClient.group.findMany({
      where: {
        userId: userId,
      },
      include: {
        books: true,
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
      include: {
        books: true,
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
      include: {
        books: true,
      },
    });

    return genres;
  } catch (err) {
    console.error("Error reading genres:", err);

    throw err;
  }
}

export async function readGenre(userId: string, name: string) {
  try {
    const genre = await prismaClient.genre.findFirst({
      where: {
        userId,
        name,
      },
    });

    return genre;
  } catch (err) {
    console.error("Error reading genre:", err);

    throw err;
  }
}

export async function createGenre(
  userId: string,
  name: string,
  description: string
) {
  try {
    await prismaClient.genre.create({
      data: {
        userId,
        name,
        description,
      },
    });
  } catch (err) {
    console.error("Error creating genre:", err);

    throw err;
  }
}

export async function readBooks(userId: string) {
  try {
    const books = await prismaClient.book.findMany({
      where: {
        userId: userId,
      },
      include: {
        genres: true,
        notes: true,
        author: true,
        group: true,
      },
    });

    return books;
  } catch (err) {
    console.error("Error reading books:", err);

    throw err;
  }
}

export async function readBook(
  userId: string,
  title: string,
  groupId: string,
  authorId: string
) {
  try {
    const book = await prismaClient.book.findFirst({
      where: {
        userId,
        title,
        groupId,
        authorId,
      },
    });

    return book;
  } catch (err) {
    console.error("Error reading book:", err);

    throw err;
  }
}

export async function createBook(
  userId: string,
  title: string,
  description: string,
  groupId: string,
  authorId: string,
  genreIds: string[]
) {
  try {
    await prismaClient.book.create({
      data: {
        userId,
        title,
        description,
        groupId,
        authorId,
        genres: {
          connect: genreIds.map((genreId) => ({ id: genreId })),
        },
      },
    });

    return "Book created successfully!";
  } catch (err) {
    console.error("Error creating book:", err);

    throw err;
  }
}

export async function readNote(
  userId: string,
  bookId: string,
  content: string
) {
  try {
    const note = await prismaClient.note.findFirst({
      where: {
        userId,
        bookId,
        content,
      },
    });

    return note;
  } catch (err) {
    console.error("Error creating note:", err);

    throw err;
  }
}

export async function createNote(
  userId: string,
  bookId: string,
  content: string
) {
  try {
    await prismaClient.note.create({
      data: {
        userId,
        bookId,
        content,
      },
    });
  } catch (err) {
    console.error("Error creating note:", err);

    throw err;
  }
}

// Check if book exists during update
export async function readBook2(
  bookId: string,
  title: string,
  description: string,
  groupId: string,
  authorId: string,
  genreIds: string[]
) {
  try {
    const book = await prismaClient.book.findFirst({
      where: {
        id: bookId,
        title,
        description,
        groupId,
        authorId,
        genres: {
          every: {
            id: {
              in: genreIds, // All genres in the book must exist in genreIds
            },
          },
          none: {
            id: {
              notIn: genreIds, // No extra genres outside genreIds
            },
          },
        },
      },
    });

    return book;
  } catch (err) {
    console.error("Error reading book2:", err);

    throw err;
  }
}

export async function updateBook(
  bookId: string,
  title: string,
  description: string,
  groupId: string,
  authorId: string,
  genreIds: string[]
) {
  try {
    await prismaClient.book.update({
      where: {
        id: bookId,
      },
      data: {
        title,
        description,
        groupId,
        authorId,
        genres: {
          set: genreIds.map((genreId) => ({ id: genreId })),
        },
      },
    });
  } catch (err) {
    console.error("Error updating book:", err);

    throw err;
  }
}

// Toggle favorite
export async function patchBook(bookId: string) {
  try {
    const book = await prismaClient.book.findUnique({
      where: {
        id: bookId,
      },
    });

    if (!book) {
      throw new Error("Book not found");
    }

    await prismaClient.book.update({
      where: {
        id: bookId,
      },
      data: {
        favorite: !book.favorite,
      },
    });
  } catch (err) {
    console.error("Error patching book:", err);

    throw err;
  }
}

// Update book status
export async function patchBook2(bookId: string, status: string) {
  try {
    await prismaClient.book.update({
      where: {
        id: bookId,
      },
      data: {
        status: status as "unread" | "reading" | "read",
      },
    });
  } catch (err) {
    console.error("Error patching book:", err);

    throw err;
  }
}

// Check if same book with same status exists
export async function readBook3(bookId: string, status: string) {
  try {
    const book = await prismaClient.book.findFirst({
      where: {
        id: bookId,
        status: status as "unread" | "reading" | "read",
      },
    });

    return book;
  } catch (err) {
    console.error("Error reading book3:", err);

    throw err;
  }
}
