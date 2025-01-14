import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import productRoutes from "./routes/Products.js";
import bookingRoutes from "./routes/Bookings.js";
import dotenv from "dotenv";
import stripe from "stripe";
import Product from "./models/Product.js";

// Initialize the app
const app = express();

// Load environment variables
dotenv.config();

// Set the port
const PORT = process.env.PORT || 5001;

// Middleware
// CORS configuration
const allowedOrigins = [
  "https://sparkly-truffle-d4c753.netlify.app/", // Local development frontend
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

app.use(cors(corsOptions)); // Apply CORS middleware
app.use(express.json()); // Parse JSON body

app.get("/", (req, res) => {
  res.status(200).send("Your service is live");
});

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("MongoDB URI is not defined in environment variables.");
  process.exit(1);
}
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Initialize Stripe
const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const items = req.body.items;

    const lineItems = await Promise.all(
      items.map(async (item) => {
        const storeItem = await Product.findById(item.id);

        if (!storeItem) {
          throw new Error(`Item with ID ${item.id} not found`);
        }
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: Math.round(storeItem.price * 100),
          },
          quantity: item.quantity,
        };
      })
    );

    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (e) {
    console.error("Error creating checkout session:", e);
    res.status(500).json({ error: e.message });
  }
});

// Routes
app.use("/api/products", productRoutes); // Products API routes
app.use("/api/bookings", bookingRoutes); // Bookings API routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
