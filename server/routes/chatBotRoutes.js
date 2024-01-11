import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { handleChatbotMessage } from "../controllers/chatbotController.js";

const router = express.Router();

router.post("/chatbot", verifyToken, handleChatbotMessage);

export default router;
