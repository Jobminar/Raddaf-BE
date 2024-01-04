// routes/instantevalRoutes.js
import express from "express";
import {
  getAllInstantEvals,
  postInstantEval,
} from "../controllers/instantevalController.js";

const router = express.Router();

// Route to get all InstantEvals (you can change the method to POST if needed)
router.get("/instantevals", getAllInstantEvals);

// Route to post a new InstantEval
router.post("/instantevals", postInstantEval);

export default router;
