import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./dbConfig.js";
import goalRoutes from "./routes/goalRoutes.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();
const app = express();
app.use(cors());

// connect DB
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", goalRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server running");
});
