import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const instance = await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connection successfull");
  } catch (error) {
    console.log("Error occured while connecting To DB", error.message);
  }
};

export default connectToDB;
