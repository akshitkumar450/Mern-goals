import express from "express";
const router = express.Router();

import {
  checkBody,
  createGoal,
  deleteGoal,
  getGoal,
  updateGoal,
} from "../controllers/goalController.js";

router.route("/").get(getGoal).post(checkBody, createGoal);
router.route("/:id").put(updateGoal).delete(deleteGoal);

export default router;
