import Product from "../models/product.js";
import Order from "../models/Order.js";

//  place order cod:   /api/order/cod
export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;

    if (!address || items.length === 0) {
      return res.json({ success: false, message: "Invalid data" });
    }

    let amount = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) continue; // skip if product not found
      amount += product.offerprice * item.quantity; // fix: product.offerprice, not product.offerPrice
    }

    // Add 2% tax
    amount += Math.floor(amount * 0.02);

    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });

    return res.json({ success: true, message: "Order placed successfully" });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


//  get orders by userid : /api/order/user

export const getUserOrder = async (req, res) => {
  try {
    const { userId } = req.query; 

    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 }); 

    res.json({ success: true, orders }); 
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


//  get all order (for seller / admin) : api/order/seller

export const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders }); 
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
