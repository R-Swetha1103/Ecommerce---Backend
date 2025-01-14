import express from "express";
import Product from "../models/Product.js"; // Assuming you have a Product model

const router = express.Router();

// Get products (optional: filter by category)
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    let products;

    if (category) {
      products = await Product.find({ category });
    } else {
      products = await Product.find(); // Fetch all products
    }

    res.json(products); // Return the products as JSON
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

export default router;
