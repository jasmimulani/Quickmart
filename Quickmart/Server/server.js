import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./Configs/db.js";
import connectCloudinary from "./Configs/clodinary.js";

import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import productRoute from "./routes/ProductRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRoute from "./routes/orderRoute.js";
import contactRouter from "./routes/contactRoute.js";
import logsRouter from "./routes/logsRoute.js";
import { Stripewebhooks } from "./controllers/orderController.js";

dotenv.config();

const app = express();

// ======================
// STRIPE WEBHOOK (RAW BODY)
// ======================
app.post(
  "/stripe",
  express.raw({ type: "application/json" }),
  Stripewebhooks
);

// ======================
// MIDDLEWARES
// ======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ======================
// CORS CONFIGURATION - DEPLOYMENT READY
// ======================
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? true : [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://quickmart-frontend-sntg.onrender.com"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

// Serve frontend static files (for production)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

// ======================
// ROUTES
// ======================
app.get("/", (req, res) => {
  res.status(200).send("API is working");
});

app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRoute);
app.use("/api/contact", contactRouter);
app.use("/api/logs", logsRouter);

// For production: serve frontend index.html for unknown routes
// Keep wildcard at the very end - after all other routes
app.use("*", (req, res) => {
  const indexPath = path.join(__dirname, "public", "index.html");
  res.sendFile(indexPath);
});

// ======================
// SERVER START
// ======================
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await connectCloudinary();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(` CORS enabled for: http://localhost:5173, https://quickmart-frontend-sntg.onrender.com`);
    });
  } catch (error) {
    console.error(" Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();