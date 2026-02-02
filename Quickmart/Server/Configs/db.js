import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    
    if (!mongoUri) {
      throw new Error("MongoDB URI not found in environment variables. Please set MONGODB_URI");
    }

    const options = {
      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 45000, // 45 seconds
      bufferCommands: false, // Disable mongoose buffering
    };

    mongoose.connection.on("connected", () => console.log("✅ Database connected"));
    mongoose.connection.on("error", (err) => console.error("❌ Database error:", err));
    mongoose.connection.on("disconnected", () => console.log("❌ Database disconnected"));

    await mongoose.connect(mongoUri, options);
    console.log("✅ MongoDB connection established");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
