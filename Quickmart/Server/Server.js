import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './Configs/db.js';
import connectClodinary from './Configs/clodinary.js';

import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import productRoute from './routes/ProductRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRoute from './routes/orderRoute.js';
import contactRouter from './routes/contactRoute.js';
import logsRouter from './routes/logsRoute.js';
import { Stripewebhooks } from './controllers/orderController.js';

const app = express();

// Environment PORT
const PORT = process.env.PORT || 5000;

// Connect to DB and Cloudinary
await connectDB();
await connectClodinary();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // FRONTEND_URL from Render env
  credentials: true
}));

// Stripe webhook
app.post('/stripe', express.raw({ type: 'application/json' }), Stripewebhooks);

// API root
app.get('/', (req, res) => res.send("API is workingg."));

// API routes
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRoute);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRoute);
app.use('/api/contact', contactRouter);
app.use('/api/logs', logsRouter);

// ---------- Optional: Serve frontend from backend ----------
// Only use if you want a single URL for frontend + backend
if (process.env.NODE_ENV === 'production') {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Adjust path if your dist folder is at '../client/dist'
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
