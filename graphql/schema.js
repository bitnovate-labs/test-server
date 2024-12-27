import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} from "graphql";
import { db } from "../db/db.js";

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
      async resolve(parent, args) {
        try {
          const res = await db.query("SELECT * FROM items");
          return res.rows;
        } catch (error) {
          console.error("Error fetching items:", error);
          throw new Error("Error fetching items");
        }
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
      async resolve(parent, args) {
        try {
          const res = await db.query(
            "INSERT INTO items (name) VALUES ($1) RETURNING *",
            [args.name]
          );
          return res.rows[0]; // Return the inserted item
        } catch (error) {
          console.error("Error adding item:", error);
          throw new Error("Error adding item");
        }
      },
    },
  },
});

// Setup GraphQL schema
export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
