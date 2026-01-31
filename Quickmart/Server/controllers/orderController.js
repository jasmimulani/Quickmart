import Product from "../models/product.js";
import Order from "../models/Order.js";
import Stripe from "stripe";
import User from "../models/User.js";
import sendOrderEmail from "../utils/sendOrderEmail.js";

// COD order: /api/order/cod
export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;

    if (!address || items.length === 0) {
      return res.json({ success: false, message: "Invalid data" });
    }

    let amount = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) continue;
      amount += product.offerprice * item.quantity;
    }

    // Add 2% tax
    amount += Math.floor(amount * 0.02);

    const order = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
      isPaid: true, // COD is marked as paid (user will pay in person)
    });

    await sendOrderEmail(userId, order);

    return res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Stripe order: /api/order/stripe
export const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    const { origin } = req.headers;

    if (!address || items.length === 0) {
      return res.json({ success: false, message: "Invalid data" });
    }

    let productData = [];
    let amount = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) continue;
      productData.push({
        name: product.name,
        price: product.offerprice,
        quantity: item.quantity,
      });
      amount += product.offerprice * item.quantity;
    }

    // Add 2% tax
    amount += Math.floor(amount * 0.02);

    const order = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "Online",
      isPaid: false, // Online payment is pending until Stripe webhook confirms
    });

    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

    const line_items = productData.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 1.02 * 100), // Convert to paise (INR subunit: 1 INR = 100 paise)
      },
      quantity: item.quantity,
    }));

    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/loader?next=my-orders`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: order._id.toString(),
        userId,
      },
    });

    return res.json({ success: true, url: session.url });
  } catch (error) {
    console.log("Stripe Error:", error);
    return res.json({ success: false, message: error.message });
  }
};

// In your controller: Stripewebhooks
export const Stripewebhooks = async (req, res) => {
  const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  //  Put this inside the switch-case below:
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const { orderId, userId } = session.metadata;

      console.log("Checkout completed: ", { orderId, userId });

      try {
        const updatedOrder = await Order.findByIdAndUpdate(
          orderId,
          { isPaid: true },
          { new: true }
        );
        await User.findByIdAndUpdate(userId, { cartItems: {} }); // clear cart
        await sendOrderEmail(userId, updatedOrder);
        console.log("Order updated successfully:", orderId);
      } catch (error) {
        console.error("Error updating order:", error);
      }

      break;
    }

    case "checkout.session.expired": {
      const session = event.data.object;
      const { orderId } = session.metadata;

      console.log("Checkout expired: ", orderId);
      await Order.findByIdAndDelete(orderId);
      break;
    }

    default:
      console.error(`Unhandled event type: ${event.type}`);
      break;
  }

  res.json({ received: true });
};




// Get orders by user ID: /api/order/user
export const getUserOrder = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.json({ success: false, message: "User ID is required" });
    }

    const orders = await Order.find({ userId })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// Get all orders (admin/seller): /api/order/seller
export const getAllOrder = async (req, res) => {
  try {
    console.log('Seller requesting orders...');
    const orders = await Order.find({})
      .populate("items.product address")
      .sort({ createdAt: -1 });

    console.log('Found orders:', orders.length);
    console.log('Orders data:', orders);

    res.json({ success: true, orders });
  } catch (error) {
    console.error('Error in getAllOrder:', error);
    res.json({ success: false, message: error.message });
  }
};
