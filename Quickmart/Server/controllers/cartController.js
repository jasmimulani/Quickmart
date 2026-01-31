import User from '../models/User.js';

export const updateCart = async (req, res) => {
  try {
    const { userId, cartItems } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    // Update cart in DB
    const user = await User.findByIdAndUpdate(
      userId,
      { cartItems },
      { new: true }
    );

    res.json({ success: true, cartItems: user.cartItems });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

