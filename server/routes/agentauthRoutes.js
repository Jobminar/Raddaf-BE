// agentAuthRoutes.js
import express from "express";
import * as agentAuthController from "../controllers/agentauthController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", agentAuthController.signUpAgent);

router.post("/login", agentAuthController.loginAgent);

router.get("/logout", agentAuthController.logout);

router.get("/check-session", verifyToken, agentAuthController.checkSession);

export default router;
