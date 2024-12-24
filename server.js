import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

// CORS Configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => res.send("Server started here!!!"));

app.listen(PORT, "0.0.0.0", (req, res) =>
  console.log(`Server started listening on port ${PORT}`)
);
