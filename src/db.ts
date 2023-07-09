import mongoose from "mongoose";
require("dotenv").config();
const connectToDatabase = async () => {
  try {
    const connection = await mongoose.connect(
      `mongodb+srv://dbuser1:${process.env.PASSWORD}@cluster0.fkxltzv.mongodb.net/?retryWrites=true&w=majority`
    )
    if(connection){
        console.log("connection established")
    }
  } catch (error) {
    console.log("Failed to connect to database", error);
    throw error;
  }
};
export default connectToDatabase
