import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  email: { type: String, required: true },
  reason: { type: String },
  timestamp: { type: Date, default: Date.now },
});

const Log = mongoose.models.log || mongoose.model("log", logSchema);

export default Log;
