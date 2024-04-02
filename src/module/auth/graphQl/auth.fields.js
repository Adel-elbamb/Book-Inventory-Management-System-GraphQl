import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { loginResolver, updateUserResolver, userProfileResolver } from "./auth.resolvers.js";
import image from "../../../utilis/graphQlGeneralFields.js";

export const loginField = {
  name: "Userlogin",
  description: "user Login",
  type: new GraphQLObjectType({
    name: "userLogin",
    fields: {
      token: { type: GraphQLString },
      refToken: { type: GraphQLString },
    },
  }),
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: loginResolver,
};
export const userProfile = {
  name: "UserProfile",
  description: "user Profile",
  type: new GraphQLObjectType({
    name: "userProfile",
    fields: {
      userName: { type: GraphQLString },
      email: { type: GraphQLString },
      phone: { type: GraphQLString },
      department: { type: GraphQLString },
      gender: { type: GraphQLString },
      image: image("userImage"),
      semester: { type: GraphQLString },
    },
  }),
  args: {
    authorization: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: userProfileResolver,
};
export const updateUser = {
  name: "UpdateUser",
  description: "update User",
  type: new GraphQLObjectType({
    name: "updateUser",
    fields: {
      userName: { type: GraphQLString },
      email: { type: GraphQLString },
      phone: { type: GraphQLString },
      department: { type: GraphQLString },
      gender: { type: GraphQLString },
      semester: { type: GraphQLString },
    },
  }),
  args: {
    authorization: { type: new GraphQLNonNull(GraphQLString) },
    userName: { type: GraphQLString },
    phone: { type: GraphQLString },
    department: { type: GraphQLString },
    semester: { type: GraphQLString },
  },
  resolve: updateUserResolver,
};
