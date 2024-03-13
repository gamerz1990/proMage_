import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI: string =
  process.env.MONGO_URI || "mongodb://localhost:27017/promage_mainDB";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI, {});
    console.log("MongoDB connected...");
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};
