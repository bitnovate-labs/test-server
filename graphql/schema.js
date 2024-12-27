import { buildSchema } from "graphql";
import { db } from "../db/db.js";

export const schema = buildSchema(`
    type Item {
    item_id: Int
    name: String
    description: String
    price: Float
    quantity: Int
    created_at: String
  }

  type Query {
    items: [Item]
    item(id: ID!): Item
  }

  type Mutation {
    addItem(name: String!, description: String, price: Float!, quantity: Int!): Item
  }
`);

export const rootValue = {
  // Fetch All Items
  items: async () => {
    try {
      const res = await db.query("SELECT * FROM items");
      return res.rows;
    } catch (error) {
      console.error("Error fetching items:", error);
      throw new Error("Error fetching items");
    }
  },

  // Fetch a single item by ID
  item: async ({ id }) => {
    try {
      const res = await db.query("SELECT * FROM items WHERE item_id = $1", [
        id,
      ]);
      return res.rows[0] || null; // Return null if no item found
    } catch (error) {
      console.error("Error fetching item:", error);
      throw new Error("Error fetching item");
    }
  },

  // Add a new item to the database
  addItem: async ({ name, description, price, quantity }) => {
    try {
      const res = await db.query(
        "INSERT INTO items (name, description, price, quantity) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, description, price, quantity]
      );
      return res.rows[0]; // Return the inserted item
    } catch (error) {
      console.error("Error adding item:", error);
      throw new Error("Error adding item");
    }
  },
};
