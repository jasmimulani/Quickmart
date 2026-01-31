import express from 'express';
import authUser from '../middlewares/authUser.js';
import { getAllOrder, getUserOrder, placeOrderCOD, placeOrderStripe, Stripewebhooks } from '../controllers/orderController.js';
import authSeller from '../middlewares/authSeller.js';

const orderRouter = express.Router();

orderRouter.post('/cod' , authUser , placeOrderCOD);
orderRouter.post('/stripe' , authUser , placeOrderStripe);
orderRouter.get('/user' , authUser , getUserOrder);
orderRouter.get('/seller' , authSeller , getAllOrder);
// Stripe webhook route (raw body for signature verification - place before body parser if needed)
orderRouter.post('/stripe-webhook', Stripewebhooks);


export default orderRouter;

