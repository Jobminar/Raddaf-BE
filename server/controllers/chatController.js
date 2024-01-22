// chatController.js
import Chat from "../models/chatSchema.js";

export const saveMessage = async (sender, receiver, message) => {
  try {
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
