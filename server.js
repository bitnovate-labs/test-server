import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema, rootValue } from "./graphql/schema.js";
// import { resolvers } from "./graphql/resolvers.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    // rootValue,
    // rootValue: resolvers,
    graphiql: true,
  })
);

// CORS Configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    // origin: "https://main.dbg1wx3tbcsoa.amplifyapp.com/",
    // origin:
    //   "http://s3.test.application.s3-website-ap-southeast-1.amazonaws.com/",
    credentials: true,
  })
);

// Read the SSL certificate and private key
// const privateKey = fs.readFileSync("./certificates/private_key.pem", "utf-8");
// const certificate = fs.readFileSync("./certificates/certificate.crt", "utf-8");

// const credentials = { key: privateKey, cert: certificate };

app.get("/", (req, res) => res.send("Server started here!!!"));

// Create an HTTPS server
// https.createServer(credentials, app).listen(443, "0.0.0.0", () => {
//   console.log("Server is running on HTTPS://localhost:443");
// });

app.listen(PORT, "0.0.0.0", (req, res) =>
  console.log(`Server started listening on port ${PORT}`)
);

// app.listen(PORT, "0.0.0.0", (req, res) =>
//   console.log(`Server started listening on port ${PORT}`)
// );
