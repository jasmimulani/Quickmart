import mongoose from 'mongoose';
import Order from '../models/Order.js';
import 'dotenv/config';
import connectDB from '../Configs/db.js';

/**
 * This script updates order payment status:
 * - COD orders: Set isPaid to true (paid in person)
 * - Online orders: Set isPaid to false (pending payment confirmation)
 * Run: node scripts/updateOnlineOrdersToPaid.js
 */

const updateOrderPaymentStatus = async () => {
  try {
    await connectDB();
    console.log('Connected to database');

    // Update COD orders to isPaid: true
    const codResult = await Order.updateMany(
      { paymentType: 'COD' },
      { $set: { isPaid: true } }
    );

    console.log(`✅ Updated ${codResult.modifiedCount} COD orders to Paid`);

    // Update Online orders to isPaid: false (pending payment)
    const onlineResult = await Order.updateMany(
      { paymentType: 'Online' },
      { $set: { isPaid: false } }
    );

    console.log(`⏳ Updated ${onlineResult.modifiedCount} Online orders to Pending`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating orders:', error.message);
    process.exit(1);
  }
};

updateOrderPaymentStatus();
