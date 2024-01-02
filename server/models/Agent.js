// agentModel.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const agentSchema = new Schema({
  Username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  Fullname: String,
  title: String,
  language: String,
  googleId: String,
  facebookId: String,
  verified: { type: Boolean, default: false }, // Added "verified" field
  agentId: String, // Added "Agent ID" field
});

export default mongoose.model("Agent", agentSchema);
