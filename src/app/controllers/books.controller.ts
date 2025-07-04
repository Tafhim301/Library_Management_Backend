import express, { Request, Response } from "express";
import { Books } from "../models/books.model";
import z from "zod";
export const booksRoutes = express.Router();

const createBookZodSchema = z.object({
  title: z.string(),
  author: z.string(),
  genre: z.string(),
  isbn: z.string(),
  description: z.string().optional(),
  copies: z.number(),
  available: z.boolean().optional(),
});

booksRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const {
      filter='All',
      sort = "desc",
      sortBy = "createdAt",
      limit = "10",
      page = "1",
    } = req.query;

    const query: any = {};
    if (filter && filter !== "All" ) {
      query.genre = filter;
      
    }

    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);
    const skip = (pageNumber - 1) * limitNumber;

    const total = await Books.countDocuments(query);

    const books = await Books.find(query)
      .sort({ [sortBy as string]: sort === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(limitNumber);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      meta: {
        filter,
        total,
        limit: limitNumber,
        page: pageNumber,
        totalPages: Math.ceil(total / limitNumber),
      },
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


booksRoutes.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const book = await Books.findById(bookId);

    if (book === null) {
      res.status(404).json({
        success: false,
        message: "Book not found",
        data: null,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
});

booksRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const body = await createBookZodSchema.parseAsync(req.body);
    const book = await Books.create(body);

    res.status(200).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      error,
    });
  }
});
booksRoutes.put("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const body = req.body;

    const book = await Books.findByIdAndUpdate(bookId, body, {
      runValidators: true,
      new: true,
    });
    if (book) {
      await Books.updateAvailability(book._id);
    }
    const updatedbook = await Books.findById(bookId);

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedbook,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      error,
    });
  }
});
booksRoutes.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    await Books.findByIdAndDelete(bookId);

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      error,
    });
  }
});
