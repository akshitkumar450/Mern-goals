import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
  },
  {
    timestamps: true, //updatedat,createdat automatically
  }
);

const Goals = mongoose.model("Goal", goalSchema);
export default Goals;
