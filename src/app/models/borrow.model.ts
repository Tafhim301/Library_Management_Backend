import { Error, model, Schema, Types } from "mongoose";
import { IBorrow, } from "../interfaces/borrow.interface";

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Books",
      required: true,
    },

    quantity: {
      type: Number,
      min: [1, "Quantity must be a positive number"],
    },

    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);



export const Borrows = model("Borrows", borrowSchema);
