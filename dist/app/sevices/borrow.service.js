"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrowedBooks = exports.borrowBook = void 0;
const books_model_1 = require("../models/books.model");
const borrow_model_1 = require("../models/borrow.model");
const borrowBook = (bookId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield books_model_1.Books.findById(bookId);
    if (!book) {
        throw new Error("Book not found");
    }
    if (book.copies < quantity) {
        throw new Error("Not enough copies");
    }
    book.copies = book.copies - quantity;
    yield book.save();
    yield books_model_1.Books.updateAvailability(bookId);
});
exports.borrowBook = borrowBook;
const getBorrowedBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield borrow_model_1.Borrows.aggregate([
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
            $unwind: "$borrowedBooks"
        },
        {
            $project: {
                totalQuantity: 1,
                book: {
                    title: "$borrowedBooks.title",
                    isbn: "$borrowedBooks.isbn"
                }
            }
        }
    ]);
    return book;
});
exports.getBorrowedBooks = getBorrowedBooks;
