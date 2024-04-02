import { GraphQLObjectType, GraphQLSchema } from "graphql";
import {
  getAllBooksField,
  getOneBook,
  borrowBook,
  deleteBook,
} from "./book.fields.js";

const bookSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "BookSchema",
    description: "book schema",
    fields: {
      getAllBooks: getAllBooksField,
      getOneBook: getOneBook,
      borrowBook: borrowBook,
      deleteBook: deleteBook,
    },
  }),
});
export default bookSchema;
