import { buildSchema } from "graphql";
import { db } from "../db/db.js";

export const schema = buildSchema(`
  type Item {
    id: String
    name: String
  }

  type Query {
    items: [Item]
    item(id: ID!): Item
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
  item: async ({ id }) => {
    try {
      const res = await db.query("SELECT * FROM items WHERE id = $1", [id]);
      return res.rows[0] || null; // Return null if no item found
    } catch (error) {
      console.error("Error fetching item:", error);
      throw new Error("Error fetching item");
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
