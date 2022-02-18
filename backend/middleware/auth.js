import jwt from "jsonwebtoken";
import Users from "../models/userModel.js";

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get Token from header
      token = req.headers.authorization.split(" ")[1];

      // verify the token
      const decoded = jwt.verify(token, "super-secret");

      // get User from the decoded token id
      const user = await Users.findById(decoded.id).select("-password");

      // add the user to req object to get access from requests
      req.user = user;
      next();
    } catch (err) {
      res.status(401).json({
        status: "fail",
        message: "not authorized",
      });
    }
  }

  if (!token) {
    res.status(401).json({
      status: "fail",
      message: "not authorized ,no token",
    });
  }
};
