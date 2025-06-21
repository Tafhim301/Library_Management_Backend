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
exports.borrowsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const borrow_model_1 = require("../models/borrow.model");
const borrow_service_1 = require("../sevices/borrow.service");
exports.borrowsRoutes = express_1.default.Router();
exports.borrowsRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield (0, borrow_service_1.getBorrowedBooks)();
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
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
exports.borrowsRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const { book, quantity } = body;
        yield (0, borrow_service_1.borrowBook)(book, quantity);
        const borrow = yield borrow_model_1.Borrows.create(body);
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrow,
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
