import express from "express";
import cors from "cors";

const app = express();

const PORT = 8080;

// CORS Configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => res.send("Server started here!!!"));

app.listen(PORT, (req, res) =>
  console.log(`Server started listening on port ${PORT}`)
);
