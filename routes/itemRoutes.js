import express from "express";
import fetch from "node-fetch"; // or any HTTP client

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await fetch(
      "http://localhost:" + process.env.PORT + "/graphql",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
          query {
            items {
              item_id
              name
              description
              price
              quantity
              created_at
            }
          }
        `,
        }),
      }
    );
    const data = await response.json();
    res.status(200).json(data.data.items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
