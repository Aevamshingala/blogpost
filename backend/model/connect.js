import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

const connectionDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION);
    console.log("conneted");
  } catch (error) {
    console.log("not connected", error);
  }
};

export default connectionDb;
