import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

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

/* ======================
   STRIPE WEBHOOK (RAW BODY)
   ====================== */
app.post(
  "/stripe",
  express.raw({ type: "application/json" }),
  Stripewebhooks
);

/* ======================
   MIDDLEWARES
   ====================== */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:5173",
    ],
    credentials: true,
  })
);

/* ======================
   ROUTES
   ====================== */
app.get("/", (req, res) => {
  res.status(200).send("API is working ");
});

app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRoute);
app.use("/api/contact", contactRouter);
app.use("/api/logs", logsRouter);

/* ======================
   SERVER START
   ====================== */
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await connectCloudinary();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();
