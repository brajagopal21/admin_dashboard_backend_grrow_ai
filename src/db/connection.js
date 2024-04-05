import { configDotenv } from "dotenv";
import mongoose from "mongoose";
configDotenv();
export const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error(error);
    throw new Error("could not connect to mongo db");
  }
};
export const disConnectFromDb = async () => {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.error(error);
    throw new Error("could not able to disconnect from mongo db");
  }
};
