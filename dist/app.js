"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./app/controllers/books.controller");
const borrows_controller_1 = require("./app/controllers/borrows.controller");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5173",
        "https://library-management-frontend-alpha.vercel.app",
    ],
}));
app.use("/api/books", books_controller_1.booksRoutes);
app.use("/api/borrow", borrows_controller_1.borrowsRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to library management server");
});
exports.default = app;
