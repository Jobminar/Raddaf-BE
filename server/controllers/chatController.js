// chatController.js
import Chat from "../models/chatSchema.js";
import Admin from "../models/Admin.js";
import Agent from "../models/Agent.js";

export const saveMessage = async (sender, receiver, message) => {
  try {
    // Check if sender and receiver emails exist in Admin or Agent schemas
    const senderExists =
      (await Admin.exists({ email: sender })) ||
      (await Agent.exists({ email: sender }));
    const receiverExists =
      (await Admin.exists({ email: receiver })) ||
      (await Agent.exists({ email: receiver }));

    if (!senderExists || !receiverExists) {
      throw new Error("Sender or receiver email does not exist.");
    }

    const newChat = new Chat({
      sender,
      receiver,
      message,
    });
    await newChat.save();
    return newChat;
  } catch (error) {
    throw error;
  }
};

export const getMessages = async () => {
  try {
    const messages = await Chat.find().sort({ createdAt: -1 }).limit(10);
    return messages.reverse();
  } catch (error) {
    throw error;
  }
};
