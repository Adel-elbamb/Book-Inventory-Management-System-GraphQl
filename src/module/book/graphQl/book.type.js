import { GraphQLBoolean, GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";
import image from "../../../utilis/graphQlGeneralFields.js";

export const bookType = new GraphQLObjectType({
  name: "getBook",
  description: "getBook",
  fields: {
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    author: { type: GraphQLString },
    publicationDate: { type: GraphQLString },
    publisher: { type: GraphQLString },
    genre: { type: GraphQLString },
    borrowed: { type: GraphQLBoolean },
    bookingDate: { type: GraphQLString },
    returnDate: { type: GraphQLString },
    borrowedUser: { type: GraphQLID },
    image: image("bookImage"),
    createdBy: {
      type: new GraphQLObjectType({
        name: "user",
        fields: {
          image: image("userImage"),
          email: { type: GraphQLString },
          userName: { type: GraphQLString },
        },
      }),
    },
  },
});
