// models/ChattingHistory.js
import mongoose from "mongoose";

const chattingHistorySchema = new mongoose.Schema({
  email: { type: String, required: false },
  phoneNumber: { type: String, required: false },
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const ChattingHistory = mongoose.model(
  "ChattingHistory",
  chattingHistorySchema
);

export default ChattingHistory;
