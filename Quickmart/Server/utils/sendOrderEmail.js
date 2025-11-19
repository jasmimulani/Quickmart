import nodemailer from "nodemailer";
import User from "../models/User.js";
import Product from "../models/product.js";

const sendOrderEmail = async (userId, order) => {
  try {
    const user = await User.findById(userId);
    if (!user || !user.email) return;

    const items = await Promise.all(
      order.items.map(async (item) => {
        const product = await Product.findById(item.product);
        return {
          name: product?.name || "Product",
          quantity: item.quantity,
          price: product?.offerprice || 0,
        };
      })
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "YOUR_GMAIL_HERE",
        pass: process.env.EMAIL_PASS || "YOUR_GMAIL_APP_PASSWORD_HERE",
      },
    });

    const itemHtml = items
      .map(
        (i) =>
          `<p>${i.name} — Qty: ${i.quantity} — Price: ₹${i.quantity * i.price}</p>`
      )
      .join("");

    // ensure 'from' uses configured email if provided
    const fromAddress = process.env.EMAIL_FROM || process.env.EMAIL_USER || "YOUR_GMAIL_HERE";

    await transporter.sendMail({
      from: `"QuickMart" <${fromAddress}>`,
      to: user.email,
      subject: "Thank you for your order – QuickMart",
      html: `
        <h2>Your Order is Confirmed!</h2>
        <p>Thank you for ordering from QuickMart.</p>
        <p><strong>Order ID:</strong> ${order._id}</p>
        <p><strong>Total Amount:</strong> ₹${order.amount}</p>
        <p><strong>Payment Mode:</strong> ${order.paymentType}</p>
        <h3>Items:</h3>
        ${itemHtml}
        <hr/>
        <p>We will notify you when your order ships.</p>
        <p><b>— Team QuickMart</b></p>
      `,
    });
  } catch (error) {
    console.log("Email Error:", error.message);
  }
};

export default sendOrderEmail;
