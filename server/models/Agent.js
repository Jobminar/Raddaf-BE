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
  // If the image is a base64 string, convert it to a Buffer and then to a string
  if (image && image.startsWith("data:image")) {
    const bufferImage = Buffer.from(image.split(",")[1], "base64");
    this.profileImage = bufferImage.toString("base64");
  } else {
    // If it's a URL, store it directly
    this.profileImage = image;
  }
});

export default mongoose.model("Agent", agentSchema);
