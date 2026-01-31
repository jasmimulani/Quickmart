import jwt from "jsonwebtoken";

const authSeller = (req, res, next) => {
  try {
    const { sellerToken } = req.cookies;
    if (!sellerToken) {
      return res.json({ success: false, message: "Not authorized" });
    }

    const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);
    // Attach entire admin payload for downstream use
    req.admin = decoded;
    next();
  } catch (error) {
    res.json({ success: false, message: "Invalid token" });
  }
};

export default authSeller;
