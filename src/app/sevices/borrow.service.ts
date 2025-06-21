import { Books } from "../models/books.model";

export const borrowBook = async (bookId: string, quantity: number) => {
  const book = await Books.findById(bookId);
  if (!book) {
    throw new Error("Book not found");
  }

  if (book.copies < quantity) {
    throw new Error("Not enough copies");
  }

  book.copies = book.copies - quantity;
  await book.save();

  await Books.updateAvailability(bookId);
};
