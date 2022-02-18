import mongoose from "mongoose";
import Goals from "../models/goalModel.js";

export const getGoal = async (req, res) => {
  // console.log(req.user);
  try {
    // getting the logged in user goal
    const id = req.user._id;
    const goals = await Goals.find({ user: id });

    if (goals.length === 0) throw new Error("no data");
    res.status(200).json({
      status: "success",
      data: goals,
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const createGoal = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      throw new Error("No data for to be saved");
    }
    // adding the logged in userid while creating a goal
    const dataAdded = await Goals.create({ user: req.user._id, text });
    res.status(201).json({
      status: "success",
      data: dataAdded,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const updateGoal = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("no post with that id");
    }
    const updatedData = await Goals.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({
      status: "success",
      data: updatedData,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("no post with that id");
    }
    const updatedData = await Goals.findByIdAndDelete(id);
    res.status(201).json({
      status: "success",
      data: updatedData,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const checkBody = (req, res, next) => {
  if (!req.body.text) {
    res.status(400).json({
      status: "fail",
      message: "no text to be added",
    });
    return;
  }
  next();
};
