import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema, rootValue } from "./graphql/schema.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
);

// CORS Configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    // methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: [
      "Content-Type",
      "Origin",
      "X-Requested-With",
      "Accept",
      "x-client-key",
      "x-client-token",
      "x-client-secret",
      "Authorization",
    ],
    credentials: true,
  })
);

app.get("/", (req, res) => res.send("Server started here!!! HEYYYYYY!!!!!"));

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server started listening on port ${PORT}`)
);
