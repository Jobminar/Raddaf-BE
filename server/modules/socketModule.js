// socketModule.js
import { Server as SocketIo } from "socket.io";
import { saveMessage, getMessages } from "../controllers/chatController.js";

const initializeSocket = (server) => {
  const io = new SocketIo(server);

  io.on("connection", (socket) => {
    console.log("User connected");

    // Listen for chat messages
    socket.on("chat message", async (msg, sender) => {
      try {
        const savedMessage = await saveMessage(sender, msg);
        io.emit("chat message", savedMessage);
      } catch (error) {
        console.error(error);
      }
    });

    // Send initial chat history to the connected user
    socket.on("request history", async () => {
      try {
        const messages = await getMessages();
        socket.emit("chat history", messages);
      } catch (error) {
        console.error(error);
      }
    });

    // Listen for disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  return io;
};

export default initializeSocket;
