// userModel.js
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  profileImage: String,
  username: { type: String, unique: true, required: false },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  title: String,
  fullname: String,
  language: String,
  googleId: { type: String, unique: true, required: false },
  facebookId: { type: String, unique: true, required: false },
});

userSchema.virtual("image").set(function (image) {
  // If the image is a base64 string, convert it to a Buffer and then to a string
  if (image && image.startsWith("data:image")) {
    const bufferImage = Buffer.from(image.split(",")[1], "base64");
    this.profileImage = bufferImage.toString("base64");
  } else {
    // If it's a URL, store it directly
    this.profileImage = image;
  }
});

export default mongoose.model("User", userSchema);
