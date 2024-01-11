// models/ChattingHistory.js
import mongoose from "mongoose";

const chattingHistorySchema = new mongoose.Schema({
  email: String,
  phoneNumber: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const ChattingHistory = mongoose.model(
  "ChattingHistory",
  chattingHistorySchema
);

export default ChattingHistory;
