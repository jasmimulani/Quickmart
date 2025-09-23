import User from "../models/User.js";
import Log from "../models/Log.js"; // new Log model
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//  register api
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "missing Details" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.json({ success: false, message: "User already existing" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

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
      message: { email: user.email, name: user.name },
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//  login user api
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.json({
        success: false,
        message: "email and password are required",
      });

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "invalid email or password" });
    }

    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch)
      return res.json({ success: false, message: "invalid email or password" });

    // set user as logged in
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
      message: { email: user.email, name: user.name },
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//  auth user
export const isAuth = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId).select("-password");

    return res.json({ success: true, user });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//  logout user
export const logout = async (req, res) => {
  try {
    const tokenUser = await User.findOne({ /* find user by token if needed */ });

    if (tokenUser) {
      tokenUser.isLoggedIn = false; // set logged in to false
      await tokenUser.save();
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({ success: true, message: "logged Out." });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//  get all users (for admin panel)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // exclude password
    return res.json({ success: true, users, total: users.length });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//  toggle user active/block status
export const toggleUser = async (req, res) => {
  try {
    const { id, isActive } = req.body;

    if (!id || typeof isActive !== "boolean") {
      return res.status(400).json({ success: false, message: "Missing parameters" });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.isActive = isActive;
    await user.save();

    // Log if blocked and not logged in
    if (!isActive && !user.isLoggedIn) {
      const log = new Log({
        userId: user._id,
        email: user.email,
        reason: "Blocked while not logged in",
      });
      await log.save();
      console.log(`Logged block action for ${user.email}`);
    }

    return res.json({ success: true, message: `User is now ${isActive ? "Active" : "Blocked"}` });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
