import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "GoalUser", //refrence to take from Users model
    },
  },
  {
    timestamps: true, //updatedat,createdat automatically
  }
);

const Goals = mongoose.model("Goal", goalSchema);
export default Goals;
