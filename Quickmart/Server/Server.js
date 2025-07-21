import cookieParser from 'cookie-parser';
import express from 'express';
import cors from'cors'
import connectDB from './Configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectClodinary from './Configs/clodinary.js';
import ProductRoute from './routes/ProductRoute.js';
import productRoute from './routes/ProductRoute.js';

const app = express();
const port = process.env.PORT || 7000;

await connectDB()
await connectClodinary()

// allow multiple origins
const allowedOrigins = ['http://localhost:5173']

//  middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins , Credentials:true}));


app.get('/',(req,res) =>res.send("api is working"));
app.use('/api/user' , userRouter)
app.use('/api/seller' , sellerRouter)
app.use('/api/product' , productRoute)


app.listen(port,() =>{
    console.log(`server is running on http://localhost:${port}`);
    
})