import { graphQlAuth } from "../../../DB/middleware/auth.js";
import { graphQlValidation } from "../../../DB/middleware/validation.js";
import bookModel from "../../../DB/models/Book.model.js";
import ApiFeatures from "../../../utilis/apiFeatures.js";
import roles from "../../../utilis/roles.js";
import {
  borrowBookSchema,
  deleteBookSchema,
  getOneBookSchema,
} from "../book.validation.js";
 


///==================================all books =====================================
export const getAllBooksResolver = async (parent, args) => {
  const apiFeature = new ApiFeatures(
    bookModel.find().populate([
      {
        path: "createdBy",
      },
    ]),
    args
  ).paginate();
  const books = await apiFeature.mongooseQuery;
  return books;
};
////==============================one book ===============================
export const getOneBookResolver = async (parent, args) => {
  graphQlValidation(getOneBookSchema, args);
  const book = await bookModel.findOne({ title: args.title })
  return book;
};


///======================================borrow ===================
export const borrowBookResolver = async (parent, args) => {
  graphQlValidation(borrowBookSchema, args);
  const user = await graphQlAuth([roles.User], args);

  const book = await bookModel.findOne({
    title: args.title,
    isDeleted: false,
  });
  if (!book) {
    throw Error("book not found");
  }
  if (book.borrowed) {
    throw Error(`can't borrow book now please wait until ${book.returnDate}`);
  }
  const borrowedBook = await bookModel.findOneAndUpdate(
    { title: args.title },
    {
      returnDate: args.returnDate,
      bookingDate: args.bookingDate,
      borrowed: true,
      borrowedUser: user._id,
    },
    { new: true }
  );
  return borrowedBook;
};

//=================================================delete =======================
export const deleteBookResolver = async (parent, args) => {
  graphQlValidation(deleteBookSchema, args);
  const user = await graphQlAuth([roles.Admin], args);

  const book = await bookModel.findOneAndUpdate(
    { title: args.title, createdBy: user._id },
    {
      isDeleted: true,
    },
    { new: true }
  );
  if (!book) {
    throw Error("book not found");
  }
  return book;
};
