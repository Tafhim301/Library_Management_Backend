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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = require("../models/books.model");
const zod_1 = __importDefault(require("zod"));
exports.booksRoutes = express_1.default.Router();
const createBookZodSchema = zod_1.default.object({
    title: zod_1.default.string(),
    author: zod_1.default.string(),
    genre: zod_1.default.string(),
    isbn: zod_1.default.string(),
    description: zod_1.default.string().optional(),
    copies: zod_1.default.number(),
    available: zod_1.default.boolean().optional(),
});
exports.booksRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter = 'All', sort = "desc", sortBy = "createdAt", limit = "10", page = "1", } = req.query;
        const query = {};
        if (filter && filter !== "All") {
            query.genre = filter;
        }
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        const skip = (pageNumber - 1) * limitNumber;
        const total = yield books_model_1.Books.countDocuments(query);
        const books = yield books_model_1.Books.find(query)
            .sort({ [sortBy]: sort === "asc" ? 1 : -1 })
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
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
            error,
        });
    }
}));
exports.booksRoutes.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield books_model_1.Books.findById(bookId);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error,
        });
    }
}));
exports.booksRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield createBookZodSchema.parseAsync(req.body);
        const book = yield books_model_1.Books.create(body);
        res.status(200).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
            error,
        });
    }
}));
exports.booksRoutes.put("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const body = req.body;
        const book = yield books_model_1.Books.findByIdAndUpdate(bookId, body, {
            runValidators: true,
            new: true,
        });
        if (book) {
            yield books_model_1.Books.updateAvailability(book._id);
        }
        const updatedbook = yield books_model_1.Books.findById(bookId);
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: updatedbook,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
            error,
        });
    }
}));
exports.booksRoutes.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        yield books_model_1.Books.findByIdAndDelete(bookId);
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
            error,
        });
    }
}));
