// Importing 'Router' from 'express'
import { Router } from "express";

// Creating a new instance of 'Router'
const router = Router();

// Importing 'saveMessage' and 'getMessages' from 'chatController'
import { saveMessage, getMessages } from "../controllers/chatController.js";

// Define a route for fetching messages
router.get("/messages", async (_req, res) => {
  try {
    // Call 'getMessages' from 'chatController' and send the messages as JSON
    const messages = await getMessages();
    res.json(messages);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Define a route for saving a new message
router.post("/messages", async (req, res) => {
  try {
    // Extract message details from the request body
    const { sender, message, receiver } = req.body;

    // Call 'saveMessage' from 'chatController' to save the message
    const savedMessage = await saveMessage(sender, message, receiver);

    // Send the saved message as JSON
    res.json(savedMessage);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Export the router
export default router;
