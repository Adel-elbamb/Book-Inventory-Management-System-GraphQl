import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { loginField, userProfile, updateUser } from "./auth.fields.js";

const Schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "userQuerySchema",
    description: "user Query Schema",
    fields: {
      login: loginField, 
      userProfile: userProfile,   // for image 
      updateUser: updateUser,
    },
  }),
});
export default Schema;
