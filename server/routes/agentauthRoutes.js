// agentAuthRoutes.js
import express from "express";
import * as agentAuthController from "../controllers/agentauthController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", agentAuthController.signUpAgent);

router.post("/login", agentAuthController.login);

router.get("/logout", agentAuthController.logout);

router.get("/check-session", verifyToken, agentAuthController.checkSession);

// Google authentication
router.get("/google/callback", agentAuthController.googleAuthCallback);

// Facebook authentication
router.get("/facebook/callback", agentAuthController.facebookAuthCallback);

export default router;
