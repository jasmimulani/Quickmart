import cookieParser from 'cookie-parser';
import express from 'express';
import cors from'cors'
import connectDB from './Configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectClodinary from './Configs/clodinary.js';
import productRoute from './routes/ProductRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRoute from './routes/orderRoute.js';

const app = express();
const port = process.env.PORT || 7000;

await connectDB()
await connectClodinary()



//  middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));




app.get('/',(req,res) =>res.send("api is working"));
app.use('/api/user' , userRouter)
app.use('/api/seller' , sellerRouter)
app.use('/api/product' , productRoute)
app.use('/api/cart' , cartRouter)
app.use('/api/address' ,addressRouter)
app.use('/api/order' , orderRoute)


app.listen(port,() =>{
    console.log(`server is running on http://localhost:${port}`);
    
})