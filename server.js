import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

// CORS Configuration
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  }),
  cors({
    // origin: "http://localhost:5173",
    origin: "https://main.dbg1wx3tbcsoa.amplifyapp.com/",
    credentials: true,
  })
);

console.log("Testing successful!");

app.get("/", (req, res) => res.send("Server started here!!!"));

app.listen(PORT, "0.0.0.0", (req, res) =>
  console.log(`Server started listening on port ${PORT}`)
);
