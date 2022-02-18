import express from "express";
const router = express.Router();
import { getMe, login, register } from "../controllers/userController.js";

router.route("/").post(register);
router.route("/login").post(login);
router.route("/me").get(getMe);

export default router;
