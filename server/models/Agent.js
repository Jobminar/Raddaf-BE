// agentModel.js
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const agentSchema = new Schema({
  profileImage: {
    type: String,
    required: false,
  },
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  fullname: String,
  title: String,
  language: String,
  googleId: { type: String, unique: true, required: false },
  facebookId: { type: String, unique: true, required: false },
  verified: { type: Boolean, default: false },
  agentId: String,
});

export default mongoose.model("Agent", agentSchema);
