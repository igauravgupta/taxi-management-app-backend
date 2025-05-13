import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}/${process.env.DB_NAME}`);
    console.log(`${process.env.MONGO_URL}/${process.env.DB_NAME}`);
    console.log(`Database connected successfully`);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
