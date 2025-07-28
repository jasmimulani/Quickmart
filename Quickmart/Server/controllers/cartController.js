import User from '../models/User.js';

export const updateCart = async (req, res) => {
  try {
    const { userId, cartItems } = req.body;

    if (!userId || !cartItems) {
      return res.json({ success: false, message: "Missing userId or cartItems" });
    }

    await User.findByIdAndUpdate(userId, { cartItems });

    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
