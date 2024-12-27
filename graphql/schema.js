import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} from "graphql";

// export const schema = buildSchema(`
//     type Query {
//         message: String
//         users: [User]
//     }

//     type Mutation {
//         addUser(name: String!, email: String!): User
//     }

//     type User {
//         id: ID
//         name: String
//         email: String
//     }
// `);

// Define GraphQL Item Type
const ItemType = new GraphQLObjectType({
  name: "Item",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});

// Define Root Query for GraphQL
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    items: {
      type: new GraphQLList(ItemType),
      resolve(parent, args) {
        return pool.query("SELECT * FROM items").then((res) => res.rows);
      },
    },
  },
});

// Define Mutation for Adding an Item
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addItem: {
      type: ItemType,
      args: {
        name: { type: GraphQLString },
      },
      resolve(parent, args) {
        return pool
          .query("INSERT INTO items (name) VALUES ($1) RETURNING *", [
            args.name,
          ])
          .then((res) => res.rows[0]);
      },
    },
  },
});

// Setup GraphQL schema
export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
