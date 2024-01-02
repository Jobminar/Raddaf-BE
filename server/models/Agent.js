// agentModel.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const agentSchema = new Schema({
  profileImage: String,
  Username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  Fullname: String,
  title: String,
  language: String,
  googleId: String,
  facebookId: String,
  verified: { type: Boolean, default: false },
  agentId: String,
});
agentSchema.virtual("image").set(function (image) {
  this.profileImage = image;
});
export default mongoose.model("Agent", agentSchema);
