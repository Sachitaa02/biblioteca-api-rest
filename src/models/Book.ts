import { Schema, model } from "mongoose";
import { IBook } from "../interfaces/book.interface";

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    author: {
      type: String,
      required: true,
      trim: true,
    },

    publishedYear: {
      type: Number,
      required: false,
    },

    genre: {
      type: String,
      required: false,
      trim: true,
    },

    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Book = model<IBook>("Book", bookSchema);