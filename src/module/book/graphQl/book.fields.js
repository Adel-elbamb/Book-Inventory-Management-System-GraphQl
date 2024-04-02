import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import {
  getAllBooksResolver,
  getOneBookResolver,
  borrowBookResolver,
  deleteBookResolver,
} from "./book.resolvers.js";
import { bookType } from "./book.type.js";


export const getAllBooksField = {
  name: "GetAllBooks",
  description: "getAllBooks",
  type: new GraphQLList(bookType),
  args: {
    page: { type: GraphQLInt },
    size: { type: GraphQLInt },
  },
  resolve: getAllBooksResolver,
};

export const getOneBook = {
  name: "GetOneBook",
  description: "GetOneBook",
  type: bookType,
  args: {
    title: { type: GraphQLString },
  },
  resolve: getOneBookResolver,
};

export const borrowBook = {
  name: "BorrowBook",
  description: "BorrowBook",
  type: bookType,
  args: {
    authorization: { type: new GraphQLNonNull(GraphQLString) }, // validatoiooi
    title: { type: new GraphQLNonNull(GraphQLString) },
    bookingDate: { type: new GraphQLNonNull(GraphQLString) },
    returnDate: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: borrowBookResolver,
};

export const deleteBook = {
  name: "DeleteBook",
  description: "DeleteBook",
  type: bookType,
  args: {
    authorization: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: deleteBookResolver,
};
