import mongoose, { Mongoose } from "mongoose";


const MONGODB_URL: string | undefined = process.env.MONGODB_URL;

const connectDB: () => Promise<void> = async () => {
  if (!MONGODB_URL) {
    throw new Error("MONGODB_URL is not defined in the environment variables");
  }

  if (mongoose.connection.readyState >= 1) {
    console.log("Already connected to the database.");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URL, {
      // Add any options you need here
    });
    console.log("Database is connected successfully");
  } catch (err: any) {
    console.error("Database connection error", err);
    throw err;
  }
};

export {connectDB}