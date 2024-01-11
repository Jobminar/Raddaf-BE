import express from "express";

import {
  handleChatbotMessage,
  handleContactRoute,
} from "../controllers/chatbotController.js";

const router = express.Router();

router.post("/chatbot", handleChatbotMessage);
router.post("/chatbot/contact", handleContactRoute);

export default router;
