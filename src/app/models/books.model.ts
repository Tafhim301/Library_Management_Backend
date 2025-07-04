import { model, Schema } from "mongoose";
import { IBooks, UserStaticMethods } from "../interfaces/books.interface";

const bookSchema = new Schema<IBooks, UserStaticMethods>(
  {
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

bookSchema.static("updateAvailability", async function (bookId: string) {
  const book = await this.findById(bookId);
  if (!book) {
    return;
  }

  if (book.copies === 0) {
    book.available = false;
    await book.save();
  } else if (book.copies > 0) {
    book.available = true;
    await book.save();
  } else {
    throw new Error("Invalid Input");
  }
});

bookSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("isbn")) {
    const query: any = { isbn: this.isbn };

    if (!this.isNew) {
      query._id = { $ne: this._id };
    }

    const existingBook = await (this.constructor as any).findOne(query);
    if (existingBook) {
      return next(new Error("ISBN must be unique"));
    }
  }
  next();
});



export const Books = model<IBooks, UserStaticMethods>("Books", bookSchema);
