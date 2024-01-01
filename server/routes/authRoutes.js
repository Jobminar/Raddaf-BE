import express from "express";
import * as authController from "../controllers/authController.js";
import { checkSession } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", authController.signUp);

router.post("/login", authController.login);

router.get("/logout", authController.logout);

router.get("/check-session", verifyToken, checkSession);

// Google authentication
router.get("/google/callback", authController.googleAuthCallback);

// Facebook authentication
router.get("/facebook/callback", authController.facebookAuthCallback);

export default router;
