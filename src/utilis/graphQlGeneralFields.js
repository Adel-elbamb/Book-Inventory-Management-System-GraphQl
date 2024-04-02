import { GraphQLObjectType, GraphQLString } from "graphql";
 //graphQl 
const image = (name) => {
  return {
    type: new GraphQLObjectType({
      name: name,
      description: name,
      fields: {
        public_id: { type: GraphQLString },
        secure_url: { type: GraphQLString },
      },
    }),
  };
};
export default image;
