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
exports.Books = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        enum: [
            "FICTION",
            "NON_FICTION",
            "SCIENCE",
            "HISTORY",
            "BIOGRAPHY",
            "FANTASY",
        ],
        required: true,
    },
    isbn: {
        type: String,
        required: true,
        unique: [true, "ISBN must be unique"],
    },
    description: {
        type: String,
    },
    copies: {
        type: Number,
        min: [0, "Copies must be a positive number"],
        required: true,
    },
    available: {
        type: Boolean,
        default: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});
bookSchema.static("updateAvailability", function (bookId) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield this.findById(bookId);
        if (!book) {
            return;
        }
        if (book.copies === 0) {
            book.available = false;
            yield book.save();
        }
        else if (book.copies > 0) {
            book.available = true;
            yield book.save();
        }
        else {
            throw new Error("Invalid Input");
        }
    });
});
bookSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isNew || this.isModified("isbn")) {
            const query = { isbn: this.isbn };
            if (!this.isNew) {
                query._id = { $ne: this._id };
            }
            const existingBook = yield this.constructor.findOne(query);
            if (existingBook) {
                return next(new Error("ISBN must be unique"));
            }
        }
        next();
    });
});
exports.Books = (0, mongoose_1.model)("Books", bookSchema);
