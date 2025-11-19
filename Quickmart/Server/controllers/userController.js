import User from "../models/User.js";
import Log from "../models/Log.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";

/**
 * REGISTER USER
 */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing details" });
    }

    // Enforce email contains '@' and ends with '.com'
    const emailLower = String(email).trim().toLowerCase();
    if (!emailLower.includes("@") || !emailLower.endsWith(".com")) {
      return res.json({ success: false, message: "Email must contain '@' and end with '.com'" });
    }

    const existingUser = await User.findOne({ email: emailLower });
    if (existingUser)
      return res.json({ success: false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email: emailLower,
      password: hashedPassword,
      isActive: true,
      isLoggedIn: false,
    });

    await sendEmail(
      user.email,
      "Welcome to QuickMart",
      `<h2>Hello ${user.name}</h2><p>Thank you for registering on QuickMart!</p>`
    );

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "Registration successful",
      user: { email: user.email, name: user.name },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.json({ success: false, message: error.message });
  }
};

/**
 * LOGIN USER
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.json({
        success: false,
        message: "Email and password are required",
      });

    // Enforce email format: must contain '@' and end with '.com'
    const emailLower = String(email).trim().toLowerCase();
    if (!emailLower.includes("@") || !emailLower.endsWith(".com")) {
      return res.json({ success: false, message: "Email must contain '@' and end with '.com'" });
    }

  const user = await User.findOne({ email: emailLower });
    if (!user)
      return res.json({ success: false, message: "Invalid email or password" });

    // Check if user is blocked
    if (!user.isActive)
      return res.json({
        success: false,
        message: "Your account is blocked. Contact admin.",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.json({ success: false, message: "Invalid email or password" });

    // Mark user as logged in
    user.isLoggedIn = true;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "Login successful",
      user: { email: user.email, name: user.name },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.json({ success: false, message: error.message });
  }
};

/**
 * AUTHENTICATE USER (check if token valid)
 */
export const isAuth = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId)
      return res.json({ success: false, message: "User ID is required" });

    const user = await User.findById(userId).select("-password");
    if (!user)
      return res.json({ success: false, message: "User not found" });

    return res.json({ success: true, user });
  } catch (error) {
    console.error("Auth Error:", error);
    res.json({ success: false, message: error.message });
  }
};

/**
 * LOGOUT USER
 */
export const logout = async (req, res) => {
  try {
    // Ideally, you'd get user info from decoded JWT
    const token = req.cookies?.token;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (user) {
        user.isLoggedIn = false;
        await user.save();
      }
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    res.json({ success: false, message: error.message });
  }
};

/**
 * GET ALL USERS (Admin)
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.json({
      success: true,
      users,
      total: users.length,
    });
  } catch (error) {
    console.error("GetAllUsers Error:", error);
    res.json({ success: false, message: error.message });
  }
};

/**
 * TOGGLE USER ACTIVE/BLOCK STATUS (Admin)
 */
export const toggleUser = async (req, res) => {
  try {
    const { id, isActive } = req.body;

    if (!id || typeof isActive !== "boolean") {
      return res
        .status(400)
        .json({ success: false, message: "Missing or invalid parameters" });
    }

    const user = await User.findById(id);
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    user.isActive = isActive;
    await user.save();

    // If blocked and not logged in, log this action
    if (!isActive && !user.isLoggedIn) {
      await Log.create({
        userId: user._id,
        email: user.email,
        reason: "Blocked while not logged in",
        timestamp: new Date(),
      });
      console.log(`Logged block action for ${user.email}`);
    }

    return res.json({
      success: true,
      message: `User is now ${isActive ? "Active" : "Blocked"}`,
    });
  } catch (error) {
    console.error("ToggleUser Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
