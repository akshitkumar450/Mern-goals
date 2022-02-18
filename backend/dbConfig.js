import mongoose from "mongoose";

// const connectionURL = process.env.MONGODB_CONNECTION.replace(
//   "<PASSWORD>",
//   process.env.MONGODB_PASSWORD
// );

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_CONNECTION);
    console.log("db connection success", conn.connection.host);
  } catch (err) {
    console.log(err.message);
  }
};

export default connectDB;
