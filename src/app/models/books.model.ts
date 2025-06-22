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
      unique: [true, "isbn must be unique"],
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

  }
  else{
    throw new Error("Invalid Input");
  }
});

bookSchema.pre("save", async function (next) {
  const existing = await Books.findOne({ isbn: this.isbn });
  if (existing && existing._id.toString() !== this._id.toString()) {
    throw new Error("ISBN must be unique");
   
   
    
  }
  next();
});


export const Books = model<IBooks, UserStaticMethods>("Books", bookSchema);
