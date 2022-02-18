import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/userModel.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new Error("please fill all details");
    }
    const existUser = await Users.findOne({ email });
    if (existUser) {
      throw new Error("email in use");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const registeredUser = await Users.create({
      name,
      email,
      password: hashedPassword,
    });

    // generating the token
    const token = jwt.sign({ id: registeredUser._id }, "super-secret", {
      expiresIn: "5h",
    });

    res.status(200).json({
      message: "success",
      data: registeredUser,
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      throw new Error("no user found");
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      throw new Error("email and password do not match");
    }

    // generating the token
    const token = jwt.sign({ id: user._id }, "super-secret", {
      expiresIn: "5h",
    });

    res.status(200).json({
      message: "success",
      data: user,
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const getMe = (req, res) => {
  //   console.log(req.user._id);
  if (req.user._id) {
    res.status(200).json({
      status: "success",
      user: req.user,
    });
  }
};
