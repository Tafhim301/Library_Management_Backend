import { Books } from "../models/books.model";
import { Borrows } from "../models/borrow.model";

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
export const getBorrowedBooks = async () => {
  const book = await Borrows.aggregate([
    { $group: { _id: "$book", totalQuantity: { $sum: 1 } } },
    {
      $lookup: {
        from: "books", 
        localField: "_id",
        foreignField: "_id",
        as: "borrowedBooks"
      }
    },
    {
      $unwind : "$borrowedBooks"
    },
    {
      $project : {
        totalQuantity : 1,
        book: {
          title: "$borrowedBooks.title",
          isbn: "$borrowedBooks.isbn"
        }
      }
    }
   
  ]);
  return book;
};
