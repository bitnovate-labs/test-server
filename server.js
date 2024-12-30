import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema, rootValue } from "./graphql/schema.js";
import cors from "cors";
import dotenv from "dotenv";
import itemRoutes from "./routes/itemRoutes.js";

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
    // origin: "http://localhost:5173",
    origin: "https://main.dbg1wx3tbcsoa.amplifyapp.com/",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    // credentials: true,
  })
);

app.use("/items", itemRoutes);

app.get("/", (req, res) =>
  res.send("Server started here!!! HEYYYYYY!!!!! What the CRAP FINALLY!!!")
);

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server started listening on port ${PORT}`)
);
