import { db } from "../db/db.js";

export const resolvers = {
  message: () => "Welcome to GraphQL TESTING Full Stack App!",
  users: async () => {
    const result = await db.query("SELECT * FROM users");
    return result.rows;
  },
  addUser: async ({ name, email }) => {
    const result = await db.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    return result.rows[0];
  },
};
