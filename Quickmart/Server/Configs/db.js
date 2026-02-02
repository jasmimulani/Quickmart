import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error("❌ MONGODB_URI is not set in environment variables");
    }

    // Log the host part of the URI (mask credentials)
    console.log(
      "Attempting MongoDB connection to:",
      uri.includes("@") ? uri.split("@")[1] : uri
    );

    // Listen for connection events
    mongoose.connection.on("connected", () =>
      console.log("Database connected")
    );
    mongoose.connection.on("error", (err) =>
      console.error(" Database connection error:", err)
    );
    mongoose.connection.on("disconnected", () =>
      console.warn("Database disconnected")
    );

    // Connect to MongoDB Atlas (no deprecated options)
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 30000, // 30 seconds timeout
      // useNewUrlParser and useUnifiedTopology are removed in Mongoose 6+
    });
  } catch (error) {
    console.error(" MongoDB connection error:", error.message || error);
    // rethrow error to let server handle startup failure
    throw error;
  }
};

export default connectDB;
