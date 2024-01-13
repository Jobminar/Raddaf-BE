import mongoose from "mongoose";

const Schema = mongoose.Schema;

const agentSchema = new Schema({
  profileImage: {
    type: String,
    required: false,
  },
  Username: { type: String, unique: false, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  fullname: String,
  title: String,
  verified: { type: Boolean, default: true },
  zoneNumber: { type: String, required: true },
  agentId: String,
  approvedOn: { type: Date, required: false, default: null },
});

export default mongoose.model("Agent", agentSchema);
