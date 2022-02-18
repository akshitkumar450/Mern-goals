import express from "express";
const router = express.Router();
import { getMe, login, register } from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

router.route("/").post(register);
router.route("/login").post(login);

router.route("/me").get(protect, getMe);

export default router;
