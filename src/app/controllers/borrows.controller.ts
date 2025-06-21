import express, { Request, Response } from "express";
import { Borrows } from "../models/borrow.model";
import { borrowBook, getBorrowedBooks } from "../sevices/borrow.service";
export const borrowsRoutes = express.Router();

borrowsRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const books = await getBorrowedBooks();
    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: books,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      error,
    });
  }
});

borrowsRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const { book, quantity } = body;
    await borrowBook(book, quantity);
    const borrow = await Borrows.create(body);

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      error,
    });
  }
});
