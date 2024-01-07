import express from "express";
import { createCallbackAgent } from "../controllers/callBackAgentController.js";

const router = express.Router();

// Create a new callback agent
router.post("/callback-agents", createCallbackAgent);

router.get("/callback-agents", getAllCallbackAgents);

export default router;
