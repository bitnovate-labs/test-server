import { buildSchema } from "graphql";
import { db } from "../db/db.js";

export const schema = buildSchema(`
  type Item {
    id: String
    name: String
  }

  type Query {
    item(id: ID!): Item
    items: [Item]
  }

  type Mutation {
    addItem(name: String!): Item
  }
`);

export const rootValue = {
  items: async () => {
    try {
      const res = await db.query("SELECT * FROM items");
      return res.rows;
    } catch (error) {
      console.error("Error fetching items:", error);
      throw new Error("Error fetching items");
    }
  },
  addItem: async ({ name }) => {
    try {
      const res = await db.query(
        "INSERT INTO items (name) VALUES ($1) RETURNING *",
        [name]
      );
      return res.rows[0]; // Return the inserted item
    } catch (error) {
      console.error("Error adding item:", error);
      throw new Error("Error adding item");
    }
  },
};
