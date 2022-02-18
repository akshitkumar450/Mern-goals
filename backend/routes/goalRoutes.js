import express from "express";
const router = express.Router();

import {
  checkBody,
  createGoal,
  deleteGoal,
  getGoal,
  updateGoal,
} from "../controllers/goalController.js";
import { protect } from "../middleware/auth.js";

// protect the routes
router.use(protect);

router.route("/").get(getGoal).post(checkBody, createGoal);
router.route("/:id").put(updateGoal).delete(deleteGoal);

export default router;
