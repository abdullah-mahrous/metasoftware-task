import mongoose from "mongoose";
import envVars from "./environment"

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("Already connected to DB");
    return;
  }

  try {
    // setting connection with mongoDB with 5 sec timeout and auto rewrite on failure
    await mongoose.connect(envVars.dbURI, {
      serverSelectionTimeoutMS: 5000,
      retryWrites: true,
    });

    isConnected = true;
    console.log("DB connected successfully");

  } catch (error: any) {
    console.log("DB connection error:", error.message);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  if (isConnected) {
    await mongoose.disconnect();
    isConnected = false;
    console.log("DB disconnected");
  }
  else 
    console.log("DB already disconnected");
};

export { connectDB, disconnectDB };
