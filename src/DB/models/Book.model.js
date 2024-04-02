import mongoose, { Schema, Types, model } from "mongoose";

const bookSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "title is required"],
      lowercase: true,
      trim: true,
    },
    author: {
      type: String,
      required: [true, "author is required"],
      lowercase: true,
      trim: true,
    },
    publicationDate: {
      type: String,
      required: [true, "publicationDate is required"],
      lowercase: true,
      trim: true,
    },
    publisher: String,
    bookingDate: String,
    borrowed: {
      type: Boolean,
      default: false,
    },
    returnDate: String,
    publisher: String,
    slug: {
      type: String,
      required: [true, "slug is required"],
    },
    genre: String,
    image: {
      type: Object,
      required: [true, "image is required"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    borrowedUser: {
      type: Types.ObjectId,
      ref: "User",
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "userId is required"],
    },
    updatedBy: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const bookModel = model("Book", bookSchema);
export default bookModel;
