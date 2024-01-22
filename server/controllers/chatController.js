// chatController.js
import Chat from "../models/chatSchema.js";
import Admin from "../models/Admin.js";
import Agent from "../models/Agent.js";

export const saveMessage = async (sender, receiver, message) => {
  try {
    // Check if sender and receiver emails exist in the Agents or Admins collection
    const isSenderAgent = await Agent.findOne({ email: sender });
    const isSenderAdmin = await Admin.findOne({ email: sender });

    const isReceiverAgent = await Agent.findOne({ email: receiver });
    const isReceiverAdmin = await Admin.findOne({ email: receiver });

    if (
      !(isSenderAgent || isSenderAdmin) ||
      !(isReceiverAgent || isReceiverAdmin)
    ) {
      throw new Error("Sender or receiver email does not exist.");
    }

    // Save the message
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
    const messages = await Chat.find().sort({ timestamp: -1 }).limit(10);
    return messages.reverse();
  } catch (error) {
    throw error;
  }
};
