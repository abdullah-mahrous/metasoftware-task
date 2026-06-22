// entrypoint for vercel
import app from "../src/app";
import { connectDB } from "../src/config/database";

const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

  } catch (error: any) {
    console.log("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

export default app;