import express from "express";
import * as agentAuthController from "../controllers/agentauthController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", agentAuthController.signUpAgent);

router.post("/login", agentAuthController.loginAgent);

// Add route for checkSessionAgent
router.get(
  "/checksessionagent",
  verifyToken,
  agentAuthController.checkSessionAgent
);

// Add route for logoutAgent
router.post("/logoutagent", verifyToken, agentAuthController.logoutAgent);

export default router;
