"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrows = void 0;
const mongoose_1 = require("mongoose");
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Books",
        required: true,
    },
    quantity: {
        type: Number,
        min: [0, "Quantity must be a positive number"],
    },
    dueDate: {
        type: Date,
        required: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});
exports.Borrows = (0, mongoose_1.model)("Borrows", borrowSchema);
