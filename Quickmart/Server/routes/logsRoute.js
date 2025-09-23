import express from "express";
import Log from "../models/Log.js";

const logsRouter = express.Router();

logsRouter.get("/", async (req, res) => {
  try {
    const logs = await Log.find().sort({ timestamp: -1 });
    res.json({ success: true, logs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default logsRouter;
