// routes/instantevalRoutes.js
import { Router } from "express";
const router = Router();
import {
  getAllInstantEvals,
  postInstantEval,
} from "../controllers/instantevalController";

// Get all instantevals
router.get("/instantevals/:userId", getAllInstantEvals);

// Post a new instanteval
router.post("/instantevals", postInstantEval);

export default router;
